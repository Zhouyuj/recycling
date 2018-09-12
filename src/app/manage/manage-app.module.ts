/**
 * Created by wujiahui on 2018/9/6.
 */
import { NgModule } from '@angular/core';

import { ManageAppRoutingModule } from './manage-app-routing.module';
import { ManageAppComponent } from './manage-app/manage-app.component';

@NgModule({
    imports: [
        ManageAppRoutingModule,
    ],
    declarations: [ ManageAppComponent ],
})
export class ManageAppModule {
}
