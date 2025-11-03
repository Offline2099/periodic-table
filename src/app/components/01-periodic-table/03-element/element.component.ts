import { Component, HostListener, input, computed } from '@angular/core';
import { NgClass } from '@angular/common';
import * as C from '../../../constants/chemistry/table-parameters';
import { ScreenSize as Size } from '../../../constants/screen-size';
import { ChemicalElement } from '../../../types/chemical-element.interface';
import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-element',
  imports: [NgClass],
  templateUrl: './element.component.html',
  styleUrl: './element.component.scss'
})
export class ElementComponent {

  @HostListener('mouseenter') onMouseEnter() {
    this.isHovered = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isHovered = false;
  }

  element = input.required<ChemicalElement>();

  isCloseToTop = computed<boolean>(() => this.element().period < 4);
  isCloseToLeft = computed<boolean>(() => this.element().group === 1);
  isCloseToRight = computed<boolean>(() => 
    this.element().group > C.NUMBER_OF_GROUPS - 3 ||
      this.element().number === C.LAST_OF_LANTHANIDES || this.element().number === C.LAST_OF_ACTINIDES
  );

  isPreviewAllowed = computed<boolean>(() => 
    ![Size.mobile, Size.tablet, Size.desktopSmall].includes(this.layout.screenSize())
  );
  isHovered: boolean = false;

  constructor(private layout: LayoutService) {}

}
