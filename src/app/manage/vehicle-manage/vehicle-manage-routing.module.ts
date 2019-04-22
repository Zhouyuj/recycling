import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FixRecordComponent } from './fixrecord/fixrecord.component';

export const ROUTER_CONFIG: Routes = [
  {
    path: '',
    children: [
      {
        path: 'fixrecord',
        component: FixRecordComponent,
        data: { title: '维修记录' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTER_CONFIG)],
  exports: [RouterModule]
})
export class VehicleManageRoutingModule {}
