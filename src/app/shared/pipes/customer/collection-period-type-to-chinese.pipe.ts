import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'collectionPeriodTypeToChinese'
})
export class CollectionPeriodTypeToChinesePipe implements PipeTransform {

    transform(value: string): any {
        if (!value) {
            return '';
        }
        return {
            KitchenWaste: '餐厨',
            WasteGrease: '油脂',
        }[value];
    }

}
