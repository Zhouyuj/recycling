import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { MonitorComponent } from './monitor.component';
import { MonitorMockService } from './monitor-mock.service';

@NgModule({
  declarations: [MonitorComponent],
  imports: [CommonModule, SharedModule],
  exports: [MonitorComponent],
  providers: [
    // { provide: MonitorService, useClass: MonitorMockService },
  ]
})
export class MonitorModule {}
