import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Subscription, interval } from 'rxjs';
import * as C from '../../constants/animation-parameters';
import { UtilityService } from '../../services/utility.service';

interface AnimatedElement {
  id: string;
  text: string;
  position: Position;
  animation: string;
}

interface Position {
  x: number;
  y: number;
}

enum Direction {
  right = 'move-down-right',
  left = 'move-down-left'
}

@Component({
  selector: 'app-animated-background',
  imports: [NgStyle],
  templateUrl: './animated-background.component.html',
  styleUrl: './animated-background.component.scss'
})
export class AnimatedBackgroundComponent {

  lines: AnimatedElement[];
  subscription: Subscription;

  constructor(private utility: UtilityService) {
    this.lines = this.generateAnimatedLines(true);
    this.subscription = interval(C.BASE_DURATION_MS).subscribe(() => {
      this.lines.push(...this.generateAnimatedLines());
      if (this.lines.length > 3 * C.NUMBER_OF_LINES) 
        this.lines = this.lines.slice(C.NUMBER_OF_LINES);
    });
  }

  generateAnimatedLines(isInitialSet: boolean = false): AnimatedElement[] {
    const lineCount: number = (isInitialSet ? 2 : 1) * C.NUMBER_OF_LINES;
    return this.utility.consecutiveIntegers(1, lineCount).map((_, index) => ({
      id: `${new Date().getTime() + index}`,
      text: this.utility.randomElement(C.FORMULAS) as string,
      position: this.randomizedPosition(),
      animation: this.randomizedAnimation(isInitialSet)
    }))
  }

  randomizedPosition(): Position {
    let x: number = 50, y: number = 50;
    while (x > C.GAP_START && x < C.GAP_END && y > C.GAP_START && y < C.GAP_END) {
      x = this.utility.randomInteger(0, 100);
      y = this.utility.randomInteger(0, 100);
    }
    return { x, y }
  }

  randomizedAnimation(isInitialSet: boolean = false): string {
    const delay: number = this.utility.randomInteger(isInitialSet ? -C.BASE_DURATION_MS : 0, C.BASE_DURATION_MS);
    const direction: Direction = this.utility.randomElement(Object.values(Direction)) as Direction;
    const isReversed: boolean = this.utility.randomInteger(0, 1) ? true : false;
    return `${direction} ${C.BASE_DURATION_MS}ms ${delay}ms linear ${isReversed ? 'reverse' : ''} both`;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
