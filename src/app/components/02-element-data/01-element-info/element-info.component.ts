import { Component, model, effect, computed } from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';
// Constants & Enums
import { ELEMENTS } from '../../../constants/chemistry/chemical-elements';
import { LAST_ELEMENT } from '../../../constants/chemistry/table-parameters';
import { ScreenSize as Size } from '../../../constants/screen-size';
// Interfaces
import { ChemicalElement } from '../../../types/chemical-element.interface';
// Components
import { DataTableComponent } from "../02-data-table/data-table.component";
// Services
import { LayoutService } from '../../../services/layout.service';

enum Controls {
  upper,
  lower
}

@Component({
  selector: 'app-element-info',
  imports: [NgClass, NgTemplateOutlet, DataTableComponent],
  templateUrl: './element-info.component.html',
  styleUrl: './element-info.component.scss'
})
export class ElementInfoComponent {

  readonly LAST_ELEMENT = LAST_ELEMENT;
  readonly Controls = Controls;

  element = model.required<ChemicalElement | undefined>();

  fadeInState: boolean = true;
  isImageShown: boolean = true;

  onlyUpperControls = computed<boolean>(() => 
    [Size.mobile, Size.tablet, Size.desktopSmall].includes(this.layout.screenSize())
  );

  constructor(private layout: LayoutService) {
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
