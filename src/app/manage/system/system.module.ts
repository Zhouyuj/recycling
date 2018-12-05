import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { ApkModule } from './apk/apk.module';

@NgModule({
    imports     : [
        CommonModule,
        SystemRoutingModule,
        ApkModule,
    ],
})
export class SystemModule {
}
