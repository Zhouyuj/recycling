import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionDateTypePipe } from './time/collection-date-type.pipe';
import { CollectionPeriodPriorityPipe } from './priority/collection-period-priority.pipe';
import { DistrictCodeToNamePipe } from './districts/district-code-to-name.pipe';
import { SecondToHourMinutePipe } from './time/second-to-hour-minute.pipe';
import { PlanPipeModule } from './plan/plan-pipe.module';

@NgModule({
    imports     : [
        CommonModule,
        PlanPipeModule,
    ],
    exports     : [
        PlanPipeModule,
        CollectionDateTypePipe,
        CollectionPeriodPriorityPipe,
        DistrictCodeToNamePipe,
        SecondToHourMinutePipe,
    ],
    declarations: [
        CollectionDateTypePipe,
        CollectionPeriodPriorityPipe,
        DistrictCodeToNamePipe,
        SecondToHourMinutePipe,
    ],
})
export class PipesModule {
}
