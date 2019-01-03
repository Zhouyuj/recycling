import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistrictCodeToNamePipe } from './districts/district-code-to-name.pipe';
import { SecondToHourMinutePipe } from './time/second-to-hour-minute.pipe';
import { CollectionDateTypePipe } from './time/collection-date-type.pipe';
import { CollectionPeriodPriorityPipe } from './priority/collection-period-priority.pipe';

@NgModule({
    imports     : [
        CommonModule
    ],
    exports: [
        DistrictCodeToNamePipe,
        SecondToHourMinutePipe,
        CollectionDateTypePipe,
        CollectionPeriodPriorityPipe,
    ],
    declarations: [ DistrictCodeToNamePipe, SecondToHourMinutePipe, CollectionDateTypePipe, CollectionPeriodPriorityPipe ],
})
export class PipesModule {
}
