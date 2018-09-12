/**
 * Created by wujiahui on 2018/9/5.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
/* 第三方 */
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

//import { NotifyComponent } from './components/notify/notify.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxDatatableModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        NgxDatatableModule,
        //NotifyComponent,
    ],
    // declarations: [ NotifyComponent ],
})
export class SharedModule {
}
