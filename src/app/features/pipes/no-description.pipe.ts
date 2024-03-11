import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noDescription',
  standalone: true,
})
export class NoDescriptionPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    if (value === '-') {
      return 'No description available';
    }
    return value;
  }
}
