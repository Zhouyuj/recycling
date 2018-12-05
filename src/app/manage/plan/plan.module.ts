import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { PlanRoutingModule } from './plan-routing.module';
import { PlanService } from './plan.service';
import { PlanComponent } from './plan/plan.component';
import { PlanMockService } from './plan-mock.service';
import { AddPlanComponent } from './add-plan/add-plan.component';
import { EditPlanComponent } from './edit-plan/edit-plan.component';

@NgModule({
    imports     : [
        CommonModule,
        SharedModule,
        PlanRoutingModule,
    ],
    declarations: [ PlanComponent, AddPlanComponent, EditPlanComponent ],
    providers   : [
        //{ provide: PlanService, useClass: PlanMockService },
        PlanService,
    ],
    entryComponents: [
        AddPlanComponent,
    ]
})
export class PlanModule {
}
