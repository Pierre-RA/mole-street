import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'number'
})
export class NumberPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    return value > 0 ? '+' + value : '' + value;
  }

}
