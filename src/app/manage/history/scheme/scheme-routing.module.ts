import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SchemeRoutesComponent } from './scheme-routes/scheme-routes.component';
import { SchemeRouteDetailComponent } from './scheme-routes/scheme-route-detail.component';

export const ROUTER_CONFIG: Routes = [
  {
    path: 'scheme',
    children: [
      {
        path: ':id/routes',
        component: SchemeRoutesComponent
      },
      {
        path: ':id/routes/:routeId/route',
        component: SchemeRouteDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTER_CONFIG)],
  exports: [RouterModule]
})
export class SchemeRoutingModule {}
