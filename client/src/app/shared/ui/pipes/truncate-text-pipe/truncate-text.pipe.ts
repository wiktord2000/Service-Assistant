import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {
  transform(text: string, limit: number): string {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }
}
