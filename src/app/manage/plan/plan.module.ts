import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { PlanRoutingModule } from './plan-routing.module';

@NgModule({
    imports     : [
        CommonModule,
        SharedModule,
        PlanRoutingModule,
    ],
    declarations: []
})
export class PlanModule {
}
