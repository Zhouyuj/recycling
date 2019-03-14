import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { SchemeModule } from './scheme/scheme.module';
import { HistoryRoutingModule } from './history-routing.module';
import { SchemeRoutingModule } from './scheme/scheme-routing.module';
import { CollectionModule } from './collection/collection.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HistoryRoutingModule,
    SchemeRoutingModule,
    SchemeModule,
    CollectionModule
  ],
  declarations: []
})
export class HistoryModule {}
