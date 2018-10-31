/**
 * Created by wujiahui on 2018/9/6.
 */
import { NgModule } from '@angular/core';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { ManageAppRoutingModule } from './manage-app-routing.module';
import { BaseInfoManagementModule } from './base-info-management/base-info-management.module';

import { TestMapComponent } from './test-map/test-map.component';
import { TestMapDemoService } from './test-map/test-map-demo.service';
import { TestMarkerDemoService } from './test-map/test-marker-demo.service';

import { ManageAppComponent } from './manage-app/manage-app.component';

@NgModule({
    imports     : [
        NgZorroAntdModule,
        CoreModule,
        SharedModule,
        ManageAppRoutingModule,
        BaseInfoManagementModule,
    ],
    declarations: [ ManageAppComponent, TestMapComponent ],
    providers   : [ TestMapDemoService, TestMarkerDemoService ],
})
export class ManageAppModule {
}
