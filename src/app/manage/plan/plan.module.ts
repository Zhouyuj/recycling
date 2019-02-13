import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { PlanRoutingModule } from './plan-routing.module';
import { PlanService } from './plan.service';
import { PlanComponent } from './plan.component';
import { PlanMockService } from './plan-mock.service';
import { AddPlanComponent } from './add-plan/add-plan.component';
import { EditPlanService } from './edit-plan/edit-plan.service';
import { EditPlanMockService } from './edit-plan/edit-plan-mock.service';
import { EditPlanModule } from './edit-plan/edit-plan.module';

@NgModule({
    imports     : [
        CommonModule,
        SharedModule,
        PlanRoutingModule,
        EditPlanModule,
    ],
    declarations: [ PlanComponent, AddPlanComponent ],
    providers   : [
        // { provide: PlanService, useClass: PlanMockService },
        PlanService,
    ],
    entryComponents: [
        AddPlanComponent,
    ]
})
export class PlanModule {
}
