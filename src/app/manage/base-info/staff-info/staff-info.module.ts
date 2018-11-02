import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

import { StaffInfoComponent } from './staff-info.component';
import { StaffInfoFormComponent } from './staff-info-form/staff-info-form.component';

import { StaffInfoService } from './staff-info.service';
import { StaffInfoMockService } from './staff-info-mock.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    declarations: [ StaffInfoComponent, StaffInfoFormComponent ],
    providers: [
        { provide: StaffInfoService, useClass: StaffInfoMockService }
    ],
    entryComponents: [
        StaffInfoFormComponent,
    ]
})
export class StaffInfoModule {
}
