/**
 * Created by wujiahui on 2018/9/5.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
/* 第三方 */
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RebirthNGModule } from 'rebirth-ng';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
/* 自定义 */
import { LoadingService } from './services/loading/loading.service';
import { MessageService } from './services/message/message.service';
import { NotificationService } from './services/notification/notification.service';

import { LoadingComponent } from './components/loading/loading.component';
import { SelectComponent } from './components/select/select.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { CascaderComponent } from './components/cascader/cascader.component';

@NgModule({
    imports     : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgxDatatableModule,
        RebirthNGModule,
        NgZorroAntdModule,
        NgxEchartsModule,
    ],
    exports     : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgxDatatableModule,
        RebirthNGModule,
        NgZorroAntdModule,
        NgxEchartsModule,
        LoadingComponent,
        SelectComponent,
        BreadcrumbsComponent,
        CascaderComponent,
    ],
    declarations: [
        LoadingComponent,
        SelectComponent,
        BreadcrumbsComponent,
        CascaderComponent,
    ],
    providers   : [ LoadingService, MessageService, NotificationService ],
})
export class SharedModule {
}
