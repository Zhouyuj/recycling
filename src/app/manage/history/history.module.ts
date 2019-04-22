import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { SchemeModule } from './scheme/scheme.module';
import { HistoryRoutingModule } from './history-routing.module';
import { SchemeRoutingModule } from './scheme/scheme-routing.module';
import { CollectionModule } from './collection/collection.module';
import { WeighBridgesModule } from './weigh-bridges/weigh-bridges.module';
import { ExceptionCustomerModule } from './exception-customer/exception-customer.module';
import { StatisticModule } from "./statistic/statistic.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HistoryRoutingModule,
    SchemeRoutingModule,
    SchemeModule,
    StatisticModule,
    CollectionModule,
    WeighBridgesModule,
    ExceptionCustomerModule
  ],
  declarations: []
})
export class HistoryModule {}
