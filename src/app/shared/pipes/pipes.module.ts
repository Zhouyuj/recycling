import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerPipeModule } from './customer/customer-pipe.module';
import { CollectionDateTypePipe } from './time/collection-date-type.pipe';
import { CollectionPeriodPriorityPipe } from './priority/collection-period-priority.pipe';
import { DistrictCodeToNamePipe } from './districts/district-code-to-name.pipe';
import { SecondToHourMinutePipe } from './time/second-to-hour-minute.pipe';
import { PlanPipeModule } from './plan/plan-pipe.module';
import { MonitorPipeModule } from './monitor/monitor-pipe.module';
import { ArrayToTimePipe } from './time/array-to-time.pipe';

@NgModule({
    imports     : [
        CommonModule,
        PlanPipeModule,
        CustomerPipeModule,
        MonitorPipeModule,
    ],
    exports     : [
        PlanPipeModule,
        CustomerPipeModule,
        MonitorPipeModule,

        CollectionDateTypePipe,
        CollectionPeriodPriorityPipe,
        DistrictCodeToNamePipe,
        SecondToHourMinutePipe,
        ArrayToTimePipe,
    ],
    declarations: [
        CollectionDateTypePipe,
        CollectionPeriodPriorityPipe,
        DistrictCodeToNamePipe,
        SecondToHourMinutePipe,
        ArrayToTimePipe,
    ],
})
export class PipesModule {
}
