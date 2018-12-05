import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlanComponent } from './plan/plan.component';
import { EditPlanComponent } from './edit-plan/edit-plan.component';

const ROUTER_CONFIG: Routes = [
    {
        path    : '', component: PlanComponent,
        children: [
            {
                path: 'edit', component: EditPlanComponent, data: { title: '编辑' },
            },
        ],
    },
];

@NgModule({
    imports     : [
        RouterModule.forChild(ROUTER_CONFIG),
    ],
    exports     : [ RouterModule ],
    declarations: [],
})
export class PlanRoutingModule {
}
