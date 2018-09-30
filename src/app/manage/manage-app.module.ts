/**
 * Created by wujiahui on 2018/9/6.
 */
import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { ManageAppRoutingModule } from './manage-app-routing.module';
import { BaseInfoManagementModule } from './base-info-management/base-info-management.module';

import { ManageAppComponent } from './manage-app/manage-app.component';

@NgModule({
    imports: [
        CoreModule,
        SharedModule,
        ManageAppRoutingModule,
        BaseInfoManagementModule,
    ],
    declarations: [ ManageAppComponent ],
})
export class ManageAppModule {
}
