import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { PlanRoutingModule } from './plan-routing.module';
import { PlanService } from './plan.service';
import { PlanComponent } from './plan/plan.component';
import { PlanMockService } from './plan-mock.service';
import { AddPlanComponent } from './add-plan/add-plan.component';
import { EditPlanComponent } from './edit-plan/edit-plan.component';
import { EditPlanService } from './edit-plan/edit-plan.service';
import { EditPlanMockService } from './edit-plan/edit-plan-mock.service';

@NgModule({
    imports     : [
        CommonModule,
        SharedModule,
        PlanRoutingModule,
    ],
    declarations: [ PlanComponent, AddPlanComponent, EditPlanComponent ],
    providers   : [
        { provide: PlanService, useClass: PlanMockService },
        //PlanService,
        { provide: EditPlanService, useClass: EditPlanMockService },
        //EditPlanService,
    ],
    entryComponents: [
        AddPlanComponent,
    ]
})
export class PlanModule {
}
