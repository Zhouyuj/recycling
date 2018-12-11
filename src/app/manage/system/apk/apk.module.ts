import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';

import { ApkComponent } from './apk.component';

import { ApkService } from './apk.service';
import {ApkServiceV2} from './apk.service-v2';

@NgModule({
    imports     : [
        CommonModule,
        SharedModule,
    ],
    declarations: [ ApkComponent ],
    providers   : [
        ApkService,
        ApkServiceV2,
    ],
})
export class ApkModule {
}
