/**
 * Created by wujiahui on 2018/9/5.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
/* 第三方 */
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RebirthNGModule } from 'rebirth-ng';
/* 自定义 */
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';
import { ServicesModule } from './services/services.module';

@NgModule({
    imports     : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,

        NgxDatatableModule,
        NgxEchartsModule,
        NgZorroAntdModule,
        RebirthNGModule,

        ComponentsModule,
        DirectivesModule,
        PipesModule,
        ServicesModule,
    ],
    exports     : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,

        NgxDatatableModule,
        NgxEchartsModule,
        NgZorroAntdModule,
        RebirthNGModule,

        ComponentsModule,
        DirectivesModule,
        PipesModule,
        ServicesModule,
    ],
    declarations: [],
})
export class SharedModule {
}
