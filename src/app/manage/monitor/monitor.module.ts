import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { MonitorComponent } from './monitor/monitor.component';

@NgModule({
    declarations: [
        MonitorComponent,
    ],
    imports     : [
        CommonModule,
        SharedModule,
    ],
    exports     : [
        MonitorComponent,
    ]
})
export class MonitorModule {
}
