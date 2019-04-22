import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FixRecordModule } from './fixrecord/fixrecord.module';
import { VehicleManageRoutingModule } from './vehicle-manage-routing.module';
import { VehicleManageComponent } from './vehicle-manage.component';
import { VehicleManageService } from './vehicle-manage.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    VehicleManageRoutingModule,
    FixRecordModule
  ],
  declarations: [VehicleManageComponent],
  providers: [VehicleManageService]
})
export class VehicleManageModule {}
