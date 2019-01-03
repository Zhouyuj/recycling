import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'collectionDateType'
})
export class CollectionDateTypePipe implements PipeTransform {

    transform(value: string): string {
        return {
            Holiday: '节假日',
            Working: '工作日',
        }[value];
    }

}
