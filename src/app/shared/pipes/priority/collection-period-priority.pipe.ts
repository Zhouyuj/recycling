import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'collectionPeriodPriority'
})
export class CollectionPeriodPriorityPipe implements PipeTransform {

  transform(value: string): any {
    return {
        Hard: '高',
        Low: '低',
    }[value];
  }

}
