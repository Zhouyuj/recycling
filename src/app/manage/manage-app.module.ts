/**
 * Created by wujiahui on 2018/9/6.
 */
import { NgModule } from '@angular/core';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SharedModule } from '../shared/shared.module';
import { ManageAppRoutingModule } from './manage-app-routing.module';
import { MonitorModule } from './monitor/monitor.module';

import { TestMapComponent } from './test-map/test-map.component';
import { TestMapDemoService } from './test-map/test-map-demo.service';
import { TestMarkerDemoService } from './test-map/test-marker-demo.service';

import { ManageAppComponent } from './manage-app.component';
import { VehicleManageModule } from './vehicle-manage/vehicle-manage.module';

@NgModule({
  imports: [
    NgZorroAntdModule,
    SharedModule,
    ManageAppRoutingModule,
    MonitorModule,
    VehicleManageModule
  ],
  declarations: [ManageAppComponent, TestMapComponent],
  providers: [TestMapDemoService, TestMarkerDemoService]
})
export class ManageAppModule {}
