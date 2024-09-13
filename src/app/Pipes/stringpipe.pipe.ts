import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringpipe',
  standalone: true
})
export class StringpipePipe implements PipeTransform {

  private numberMap: { [key: string]: number } = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,

  };
  transform(value: any): number | null {
    const normalizedText = value.toLowerCase();
    return this.numberMap[normalizedText] !== undefined ? this.numberMap[normalizedText] : 0;
  }
}
