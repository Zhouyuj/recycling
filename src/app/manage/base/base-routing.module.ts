/**
 * Created by wujiahui on 2018/11/2.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StaffInfoComponent } from './staff-info/staff-info.component';
import { VehicleInfoComponent } from './vehicle-info/vehicle-info.component';
import { CustomersInfoComponent } from './customers-info/customers-info.component';


export const ROUTER_CONFIG: Routes = [
    {
        path    : '',
        children: [
            {
                path: 'staffs', component: StaffInfoComponent, data: { title: '人员管理' },
            },
            {
                path: 'vehicles', component: VehicleInfoComponent, data: { title: '车辆管理' },
            },
            {
                path: 'customers', component: CustomersInfoComponent, data: { title: '收运单位管理' },
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
export class BaseInfoRoutingModule {
}

