import { Component, HostListener, input, computed } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { Observable, map } from 'rxjs';
import * as C from '../../../constants/chemistry/table-parameters';
import { ScreenSize } from '../../../constants/screen-size';
import { ChemicalElement } from '../../../types/chemical-element.interface';
import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-element',
  imports: [AsyncPipe, NgClass],
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

  isPreviewAllowed$: Observable<boolean>;
  isHovered: boolean = false;

  constructor(private layout: LayoutService) {
    this.isPreviewAllowed$ = this.layout.screenSize$.pipe(
      map(screenSize => 
        ![ScreenSize.mobile, ScreenSize.tablet, ScreenSize.desktopSmall].includes(screenSize)
      )
    );
  }

}
