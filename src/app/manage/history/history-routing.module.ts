import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SchemeComponent } from './scheme/scheme.component';
import { CollectionComponent } from './collection/collection.component';
import { WeighBridgesComponent } from './weigh-bridges/weigh-bridges.component';
import { ExceptionCustomerComponent } from './exception-customer/exception-customer.component';
import { StatisticComponent } from './statistic/statistic.component';
import { VehicleInspectRecordComponent } from './vehicle-inspect-record/vehicle-inspect-record.component';

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
      },
      {
        path: 'vehicleinspectrecord',
        component: VehicleInspectRecordComponent,
        data: { title: '出车检查记录' }
      },
      {
        path: 'weighbridges',
        component: WeighBridgesComponent,
        data: { title: '地磅明细' }
      },
      {
        path: 'exceptioncustomer',
        component: ExceptionCustomerComponent,
        data: { title: '异常商户' }
      },
      {
        path: 'statistic',
        component: StatisticComponent,
        data: { title: '业务统计' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTER_CONFIG)],
  exports: [RouterModule]
})
export class HistoryRoutingModule {}
