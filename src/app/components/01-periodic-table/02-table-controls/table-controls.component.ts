import { Component, input, model } from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { NUMBER_OF_GROUPS } from '../../../constants/chemistry/table-parameters';
import { VisibleRange } from '../../../constants/table-layout';

@Component({
  selector: 'app-table-controls',
  imports: [NgClass, NgTemplateOutlet],
  templateUrl: './table-controls.component.html',
  styleUrl: './table-controls.component.scss'
})
export class TableControlsComponent {

  readonly VisibleRange = VisibleRange;
  readonly NUMBER_OF_GROUPS: number = NUMBER_OF_GROUPS;
  readonly MOBILE_ROW_COUNT: number = 2;

  firstVisibleGroup = model.required<number>();
  range = input.required<VisibleRange>();

  setVisibility(firstVisibleGroup: number): void {
    this.firstVisibleGroup.set(firstVisibleGroup);
  }

}
