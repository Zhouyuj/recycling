import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { CustomersInfoComponent } from './customers-info.component';
import { CustomersInfoFormComponent } from './customers-info-form/customers-info-form.component';
import { CustomersInfoService } from './customers-info.service';

@NgModule({
    imports     : [
        CommonModule,
        SharedModule,
    ],
    declarations: [ CustomersInfoComponent, CustomersInfoFormComponent ],
    providers   : [
        CustomersInfoService,
    ],
    entryComponents: [
        CustomersInfoFormComponent,
    ]
})
export class CustomersInfoModule {
}
