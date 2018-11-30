import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlanComponent } from './plan/plan.component';

const ROUTER_CONFIG: Routes = [
    {
        path    : '', component: PlanComponent,
        /*children: [
            {
             path        : 'plan',
             loadChildren: './plan/plan.module#PlanModule',
             data        : { title: '方案管理' },
             },
        ],*/
    },
];

@NgModule({
    imports     : [
        RouterModule.forChild(ROUTER_CONFIG),
    ],
    exports: [RouterModule],
    declarations: [],
})
export class PlanRoutingModule {
}
