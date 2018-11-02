import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { StaffInfoModule } from './staff-info/staff-info.module';
import { VehicleInfoModule } from './vehicle-info/vehicle-info.module';
import { CustomersInfoModule } from './customers-info/customers-info.module';
import { BaseInfoRoutingModule } from './base-info-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        BaseInfoRoutingModule,
        StaffInfoModule,
        VehicleInfoModule,
        CustomersInfoModule,
    ],
    declarations: [],
})
export class BaseInfoModule {
}
