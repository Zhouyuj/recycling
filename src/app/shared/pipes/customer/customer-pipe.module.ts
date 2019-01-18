import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionPeriodTypeToChinesePipe } from './collection-period-type-to-chinese.pipe';

@NgModule({
    declarations: [
        CollectionPeriodTypeToChinesePipe,
    ],
    imports     : [
        CommonModule,
    ],
    exports     : [
        CollectionPeriodTypeToChinesePipe,
    ],
})
export class CustomerPipeModule {
}
