import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  /** Creates an array of consecutive integers from ```min``` to ```max```, including both. */
  consecutiveIntegers(min: number, max: number): number[] {
    if (max < min) return [];
    return [...Array(Math.floor(max - min + 1)).keys()].map(i => i + min);
  }

  /** Returns a random integer between ```min``` and ```max```, including both. */
  randomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /** Picks a random element from an array. Returns ```undefined``` for empty arrays. */
  randomElement<T>(array: T[]): T | undefined {
    return array[this.randomInteger(0, array.length - 1)];
  }

}