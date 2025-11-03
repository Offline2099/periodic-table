import { Injectable, Signal } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { BREAKPOINTS, ScreenSize } from '../constants/screen-size';
import { VisibleRange, FBlockRowLength } from '../constants/table-layout';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  screenSize: Signal<ScreenSize>;

  constructor(private observer: BreakpointObserver) {
    this.screenSize = toSignal(this.observer.observe(Object.values(BREAKPOINTS)).pipe(
      map(breakpointState => this.getScreenSize(breakpointState))
    ), { requireSync: true });
  }

  private getScreenSize(breakpointState: BreakpointState): ScreenSize {
    return Number(
      Object.entries(BREAKPOINTS).find(([_, value]) => breakpointState.breakpoints[value])![0]
    ) as ScreenSize;
  }

  getTableVisibleRange(screenSize: ScreenSize): VisibleRange {
    switch (screenSize) {
      case ScreenSize.mobile:
        return VisibleRange.mobile;
      case ScreenSize.tablet:
        return VisibleRange.tablet;
      case ScreenSize.desktopSmall:
        return VisibleRange.desktop;
      default:
        return VisibleRange.default;
    }
  }

  getFBlockRowLength(screenSize: ScreenSize): FBlockRowLength {
    switch (screenSize) {
      case ScreenSize.mobile:
        return FBlockRowLength.mobile;
      case ScreenSize.tablet:
        return FBlockRowLength.tablet;
      default:
        return FBlockRowLength.desktop;
    }
  }

}