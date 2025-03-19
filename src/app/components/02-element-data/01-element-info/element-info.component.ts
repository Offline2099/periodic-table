import { Component, model, effect } from '@angular/core';
import { AsyncPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { Observable, map } from 'rxjs';
import { ELEMENTS } from '../../../constants/chemistry/chemical-elements';
import { LAST_ELEMENT } from '../../../constants/chemistry/table-parameters';
import { ScreenSize } from '../../../constants/screen-size';
import { ChemicalElement } from '../../../types/chemical-element.interface';
import { DataTableComponent } from "../02-data-table/data-table.component";
import { LayoutService } from '../../../services/layout.service';

enum Controls {
  upper,
  lower
}

@Component({
  selector: 'app-element-info',
  imports: [AsyncPipe, NgClass, NgTemplateOutlet, DataTableComponent],
  templateUrl: './element-info.component.html',
  styleUrl: './element-info.component.scss'
})
export class ElementInfoComponent {

  readonly LAST_ELEMENT = LAST_ELEMENT;
  readonly Controls = Controls;

  element = model.required<ChemicalElement | undefined>();

  fadeInState: boolean = true;
  isImageShown: boolean = true;

  onlyUpperControls$: Observable<boolean>;

  constructor(private layout: LayoutService) {
    this.onlyUpperControls$ = this.layout.screenSize$.pipe(
      map(screenSize => 
        [ScreenSize.mobile, ScreenSize.tablet, ScreenSize.desktopSmall].includes(screenSize)
      )
    );
    effect(() => { if (this.element()) this.blink() });
  }

  selectElementByNumber(number: number): void {
    this.element.set(ELEMENTS[number - 1]);
  }

  toggleImage(): void {
    this.isImageShown = !this.isImageShown;
  }

  blink(): void {
    this.fadeInState = !this.fadeInState;
  }

  close(): void {
    this.element.set(undefined);
  }

}
