import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { SchemeModule } from './scheme/scheme.module';
import { HistoryRoutingModule } from './history-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        HistoryRoutingModule,
        SchemeModule
    ],
    declarations: [],
})
export class HistoryModule {
}
