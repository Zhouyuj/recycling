import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionDateTypePipe } from './time/collection-date-type.pipe';
import { CollectionPeriodPriorityPipe } from './priority/collection-period-priority.pipe';
import { DistrictCodeToNamePipe } from './districts/district-code-to-name.pipe';
import { SecondToHourMinutePipe } from './time/second-to-hour-minute.pipe';
import { TaskStateToChinesePipe } from './plan/plan.pipe';

@NgModule({
    imports     : [
        CommonModule
    ],
    exports     : [
        CollectionDateTypePipe,
        CollectionPeriodPriorityPipe,
        DistrictCodeToNamePipe,
        SecondToHourMinutePipe,
        TaskStateToChinesePipe,
    ],
    declarations: [
        CollectionDateTypePipe,
        CollectionPeriodPriorityPipe,
        DistrictCodeToNamePipe,
        SecondToHourMinutePipe,
        TaskStateToChinesePipe,
    ],
})
export class PipesModule {
}
