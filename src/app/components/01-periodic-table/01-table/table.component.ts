import { Component, signal, model, effect } from '@angular/core';
import { AsyncPipe, NgClass, NgTemplateOutlet, SlicePipe } from '@angular/common';
import { Observable, map, tap } from 'rxjs';
import { ELEMENTS } from '../../../constants/chemistry/chemical-elements';
import * as C from '../../../constants/chemistry/table-parameters';
import { ScreenSize } from '../../../constants/screen-size';
import { VisibleRange, FBlockRowLength } from '../../../constants/table-layout';
import { ChemicalElement } from '../../../types/chemical-element.interface';
import { TableControlsComponent } from '../02-table-controls/table-controls.component';
import { ElementComponent } from '../03-element/element.component';
import { LayoutService } from '../../../services/layout.service';
import { UtilityService } from '../../../services/utility.service';

interface PeriodicTable {
  main: (ChemicalElement | undefined)[][];
  fBlock: FBlockSeries[];
}

interface FBlockSeries {
  name: string;
  period: number;
  group: number;
  elements: ChemicalElement[];
}

const Lanthanides: Omit<FBlockSeries, 'elements'> = {
  name: 'Lanthanides',
  period: 6,
  group: C.LANTHANIDES_GROUP
}

const Actinides: Omit<FBlockSeries, 'elements'> = {
  name: 'Actinides',
  period: 7,
  group: C.ACTINIDES_GROUP
}

@Component({
  selector: 'app-table',
  imports: [
    AsyncPipe, NgClass, NgTemplateOutlet, SlicePipe,
    TableControlsComponent, ElementComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  readonly VisibleRange = VisibleRange;
  readonly RowLength = FBlockRowLength;
  readonly SERIES_LENGTH: number = C.F_BLOCK_SERIES_LENGTH;

  selectedElememnt = model.required<ChemicalElement | undefined>();

  table: PeriodicTable;

  periodHovered: number | null = null;
  groupHovered: number | null = null;

  firstVisibleGroup = signal<number>(1);
  visibleRange$: Observable<VisibleRange>;
  fBlockRowLength$: Observable<FBlockRowLength>;
  isFBlockCollapsed: boolean = true;
  
  fadeInState: boolean = true;

  constructor(private layout: LayoutService, private utility: UtilityService) {
    this.table = this.constructTable();
    this.visibleRange$ = this.layout.screenSize$.pipe(
      tap(screenSize => this.preventInvalidState(screenSize)),
      map(screenSize => this.layout.getTableVisibleRange(screenSize)),
    );
    this.fBlockRowLength$ = this.layout.screenSize$.pipe(
      map(screenSize => this.layout.getFBlockRowLength(screenSize))
    );
    effect(() => { if (this.firstVisibleGroup()) this.blink() });
  }

  constructTable(): PeriodicTable {
    return {
      main: this.utility.consecutiveIntegers(1, C.NUMBER_OF_PERIODS).map(period => 
        this.utility.consecutiveIntegers(1, C.NUMBER_OF_GROUPS).map(group => 
          ELEMENTS.find(element => element.period === period && element.group === group)
        )
      ),
      fBlock: [
        {
          ...Lanthanides,
          elements: ELEMENTS.filter(element => element.group === C.LANTHANIDES_GROUP)
        }, 
        {
          ...Actinides,
          elements: ELEMENTS.filter(element => element.group === C.ACTINIDES_GROUP)
        }    
      ]
    }
  }

  preventInvalidState(screenSize: ScreenSize): void {
    const range: number = this.layout.getTableVisibleRange(screenSize);
    if (this.firstVisibleGroup() + range >= C.NUMBER_OF_GROUPS) {
      this.firstVisibleGroup.set(C.NUMBER_OF_GROUPS - range + 1);
    }
  }

  setHoveredPeriod(period: number | null): void {
    this.periodHovered = period;
  }

  setHoveredGroup(group: number | null): void {
    this.groupHovered = group;
  }

  toggleFBlock(): void {
    this.isFBlockCollapsed = !this.isFBlockCollapsed;
  }

  selectElement(element: ChemicalElement | undefined): void {
    this.selectedElememnt.set(element);
  }

  blink(): void {
    this.fadeInState = !this.fadeInState;
  }

}
