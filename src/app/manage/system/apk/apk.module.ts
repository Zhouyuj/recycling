import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';

import { ApkComponent } from './apk.component';

import { ApkService } from './apk.service';

@NgModule({
    imports     : [
        CommonModule,
        SharedModule,
    ],
    declarations: [ ApkComponent ],
    providers   : [
        ApkService,
    ],
})
export class ApkModule {
}
