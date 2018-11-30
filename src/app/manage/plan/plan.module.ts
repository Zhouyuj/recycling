import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { PlanRoutingModule } from './plan-routing.module';
import { PlanService } from './plan.service';
import { PlanComponent } from './plan/plan.component';

@NgModule({
    imports     : [
        CommonModule,
        SharedModule,
        PlanRoutingModule,
    ],
    declarations: [ PlanComponent ],
    providers   : [ PlanService ],

})
export class PlanModule {
}
