import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { MonitorComponent } from './monitor.component';
import { MonitorService } from './monitor.service';
import { MonitorMockService } from './monitor-mock.service';

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
    ],
    providers: [
        MonitorService,
        //{ provide: MonitorService, useClass: MonitorMockService },
    ],
})
export class MonitorModule {
}
