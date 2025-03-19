import { Component, input, computed, effect } from '@angular/core';
import { NgClass } from '@angular/common';
import { PROPERTIES, Property } from '../../../constants/chemistry/element-properties';
import { LANTHANIDES_GROUP, ACTINIDES_GROUP } from '../../../constants/chemistry/table-parameters';
import { ChemicalElement } from '../../../types/chemical-element.interface';
import { ElementProperty } from '../../../types/element-property.interface';

@Component({
  selector: 'app-data-table',
  imports: [NgClass],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent {

  readonly Property = Property;

  element = input.required<ChemicalElement>();
  isImageShown = input.required<boolean>();

  data = computed<ElementProperty[]>(() => this.fillDataValues(this.element()));

  fadeInState: boolean = true;

  constructor() {
    effect(() => { if (this.element()) this.blink() });
  }

  fillDataValues(element: ChemicalElement): ElementProperty[] {
    return PROPERTIES.map(property => ({
      ...property,
      value: this.getPropertyValue(element, property.id)
    }))
  }

  getPropertyValue(element: ChemicalElement, id: Property): string | number {
    switch (id) {
      case Property.period:
        return element.period || 'N/A';
      case Property.group:
        return element.group > 0 
          ? element.group
          : element.group == LANTHANIDES_GROUP
            ? 'Lanthanides'
            : element.group == ACTINIDES_GROUP
              ? 'Actinides'
              : 'N/A';
      case Property.yearOfDiscovery:
        return element.discovery || 'Ancient times';
      case Property.weight:
        return element.weight || 'N/A';
      case Property.density:
        return element.density || 'N/A';
      case Property.meltingPoint:
        return element.melt > -274 ? element.melt : 'Unknown';
      case Property.boilingPoint:
        return element.boil > -274 ? element.boil : 'Unknown';
    }
  }

  blink(): void {
    this.fadeInState = !this.fadeInState;
  }

}
