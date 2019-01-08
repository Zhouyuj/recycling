/**
 * Created by wujiahui on 2018/9/5.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
/* 第三方 */
import { NgxEchartsModule } from 'ngx-echarts';
import { NgZorroAntdModule } from 'ng-zorro-antd';
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
        DragDropModule,

        NgxEchartsModule,
        NgZorroAntdModule,

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
        DragDropModule,

        NgxEchartsModule,
        NgZorroAntdModule,

        ComponentsModule,
        DirectivesModule,
        PipesModule,
        ServicesModule,
    ],
    declarations: [],
})
export class SharedModule {
}
