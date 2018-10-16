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
/* 自定义 */
import { LoadingService } from './services/loading/loading.service';

import { LoadingComponent } from './components/loading/loading.component';
import { SelectComponent } from './components/select/select.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
//import { NotifyComponent } from './components/notify/notify.component';

@NgModule({
    imports     : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgxDatatableModule,
        RebirthNGModule,
        NgZorroAntdModule,
    ],
    exports     : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgxDatatableModule,
        RebirthNGModule,
        NgZorroAntdModule,
        //NotifyComponent,
        LoadingComponent,
        SelectComponent,
        BreadcrumbsComponent,
    ],
    declarations: [
        //NotifyComponent,
        LoadingComponent,
        SelectComponent,
        BreadcrumbsComponent,
    ],
    providers   : [ LoadingService ],
})
export class SharedModule {
}
