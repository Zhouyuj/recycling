/**
 * Created by wujiahui on 2018/9/5.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
/* 第三方 */
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RebirthNGModule } from 'rebirth-ng';
/* 自定义 */
import { LoadingService } from './services/loading/loading.service';

import { LoadingComponent } from './components/loading/loading.component';
//import { NotifyComponent } from './components/notify/notify.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxDatatableModule,
        RebirthNGModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        NgxDatatableModule,
        RebirthNGModule,
        //NotifyComponent,
        LoadingComponent,
    ],
    declarations: [ LoadingComponent ],
    providers: [ LoadingService ],
})
export class SharedModule {
}
