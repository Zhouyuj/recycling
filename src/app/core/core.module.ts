/**
 * Created by wujiahui on 2018/9/4.
 */

import { NgModule } from '@angular/core';
/* 第三方 */
import { RebirthHttpModule } from 'rebirth-http';
import { NgZorroAntdModule } from 'ng-zorro-antd';

/* 自定义 */
import { SharedModule } from '../shared/shared.module';

import { InterceptorServices } from './services/interceptors/interceptors.service';
import { StorageService } from './services/storage/storage.service';
import { TitleService } from './services/title/title.service';

@NgModule({
    imports: [
        RebirthHttpModule,
        NgZorroAntdModule,
        SharedModule,
    ],
    exports: [],
    providers: [
        InterceptorServices,
        StorageService,
        TitleService,
    ],
    declarations: [],
})
export class CoreModule {

}
