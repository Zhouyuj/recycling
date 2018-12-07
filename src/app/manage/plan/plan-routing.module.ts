import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlanComponent } from './plan/plan.component';
import { EditPlanComponent } from './edit-plan/edit-plan.component';

export const ROUTER_CONFIG: Routes = [
    {
        path    : '',
        children: [
            {
                path: '', component: PlanComponent, data: { title: '方案管理' },
            },
            {
                path: 'edit', component: EditPlanComponent, data: { title: '方案编辑' },
            },
        ],
    },
];

@NgModule({
    imports     : [
        RouterModule.forChild(ROUTER_CONFIG),
    ],
    exports     : [ RouterModule ],
})
export class PlanRoutingModule {
}
