import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FixRecordComponent } from './fixrecord/fixrecord.component';
import { UpkeepRecordComponent } from './upkeep-record/upkeep-record.component';

export const ROUTER_CONFIG: Routes = [
  {
    path: '',
    children: [
      {
        path: 'fixrecord',
        component: FixRecordComponent,
        data: { title: '维修记录' }
      },
      {
        path: 'upkeeprecord',
        component: UpkeepRecordComponent,
        data: { title: '保养记录' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTER_CONFIG)],
  exports: [RouterModule]
})
export class VehicleManageRoutingModule {}
