import { Component, signal } from '@angular/core';
import { ELEMENTS } from './constants/chemistry/chemical-elements';
import { FOOTER_LINKS } from './constants/footer-links';
import { ChemicalElement } from './types/chemical-element.interface';
import { AnimatedBackgroundComponent } from './components/03-animated-background/animated-background.component';
import { TableComponent } from './components/01-periodic-table/01-table/table.component';
import { ElementInfoComponent } from './components/02-element-data/01-element-info/element-info.component';

@Component({
  selector: 'app-root',
  imports: [AnimatedBackgroundComponent, TableComponent, ElementInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  readonly footerLinks = FOOTER_LINKS;

  selectedElememnt = signal<ChemicalElement | undefined>(undefined);

  constructor() {
    this.preLoadImages();
  }

  preLoadImages(): void {
    ELEMENTS.forEach(element => {
      if (element.noImage) return;
      const img = new Image();
      img.src = `img/elements/${element.number}.webp`;
    });
  }

  selectElement(element: ChemicalElement | undefined): void {
    this.selectedElememnt.set(element);
  }

}
