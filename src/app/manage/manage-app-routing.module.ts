/**
 * Created by wujiahui on 2018/9/6.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageAppComponent } from './manage-app/manage-app.component';
import { StaffInfoComponent } from './base-info-management/staff-info/staff-info.component';
import { VehicleInfoComponent } from './base-info-management/vehicle-info/vehicle-info.component';
import { CustomersInfoComponent } from './base-info-management/customers-info/customers-info.component';
import { TestMapComponent } from './test-map/test-map.component';

const ROUTER_CONFIG: Routes = [
    {
        path    : '', component: ManageAppComponent,
        children: [
            {
                path: 'staff', component: StaffInfoComponent, data: { title: '人员管理' },
            },
            {
                path: 'vehicle', component: VehicleInfoComponent, data: { title: '车辆管理' },
            },
            {
                path: 'customer', component: CustomersInfoComponent, data: { title: '收运单位管理' },
            },
            {
                path: 'testMap', component: TestMapComponent, data: { title: '测试地图' },
            },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTER_CONFIG),
    ],
    exports: [
        RouterModule
    ],
})
export class ManageAppRoutingModule {
}
