import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SchemeComponent } from './scheme/scheme.component';
import { CollectionComponent } from './collection/collection.component';

export const ROUTER_CONFIG: Routes = [
  {
    path: '',
    children: [
      {
        path: 'scheme',
        component: SchemeComponent,
        data: { title: '历史方案' }
      },
      {
        path: 'collection',
        component: CollectionComponent,
        data: { title: '收运台账' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTER_CONFIG)],
  exports: [RouterModule]
})
export class HistoryRoutingModule {}
