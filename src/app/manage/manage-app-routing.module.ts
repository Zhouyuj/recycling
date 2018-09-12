/**
 * Created by wujiahui on 2018/9/6.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageAppComponent } from './manage-app/manage-app.component';

const ROUTER_CONFIG: Routes = [
    {
        path: '', component: ManageAppComponent,
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTER_CONFIG),
    ],
    exports: [
        RouterModule
    ],
})
export class ManageAppRoutingModule {}
