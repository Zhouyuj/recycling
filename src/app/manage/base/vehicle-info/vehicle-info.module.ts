import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

import { VehicleInfoComponent } from './vehicle-info.component';
import { VehicleInfoFormComponent } from './vehicle-info-form/vehicle-info-form.component';

import { VehicleInfoMockService } from './vehicle-info-mock.service';
import { VehicleInfoService } from './vehicle-info.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    declarations: [ VehicleInfoComponent, VehicleInfoFormComponent ],
    providers: [
        VehicleInfoService,
        // { provide: VehicleInfoService, useClass: VehicleInfoMockService },
    ],
    entryComponents: [
        VehicleInfoFormComponent,
    ]
})
export class VehicleInfoModule {
}
