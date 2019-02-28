import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SchemeComponent } from './scheme/scheme.component';
import { SchemeRoutesComponent } from './scheme/scheme-routes/scheme-routes.component';
import { SchemeRouteDetailComponent } from './scheme/scheme-routes/scheme-route-detail.component';


export const ROUTER_CONFIG: Routes = [
    {
        path    : 'scheme',
        children: [
            {
                path: '',
                component: SchemeComponent,
                data: { title: '历史方案' },
            },
            {
                path: ':id/routes',
                component: SchemeRoutesComponent,
            },
            {
                path: ':id/routes/:routeId/route',
                component: SchemeRouteDetailComponent,
            }
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTER_CONFIG),
    ],
    exports: [
        RouterModule
    ],
})
export class HistoryRoutingModule {
}

