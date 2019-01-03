import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { EditPlanComponent } from './edit-plan.component';
import { EditPlanService } from './edit-plan.service';
import { EditPlanMockService } from './edit-plan-mock.service';
import { VehicleSelectionComponent } from './vehicle-selection/vehicle-selection.component';
import { AddDemandComponent } from './add-demand/add-demand.component';

@NgModule({
    imports     : [
        SharedModule,
    ],
    declarations: [ EditPlanComponent, VehicleSelectionComponent, AddDemandComponent ],
    providers   : [
        //{ provide: EditPlanService, useClass: EditPlanMockService },
        EditPlanService,
    ],
    entryComponents: [ VehicleSelectionComponent, AddDemandComponent ],
})
export class EditPlanModule {
}
