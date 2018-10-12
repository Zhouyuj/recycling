/**
 * Created by wujiahui on 2018/9/4.
 */

import { NgModule } from '@angular/core';
/* 第三方 */
import { RebirthHttpModule } from 'rebirth-http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
/* 自定义 */
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { InterceptorServices } from './services/interceptors/interceptors.service';
import { TitleService } from './services/title/title.service';

@NgModule({
    imports: [
        RebirthHttpModule,
        NgZorroAntdModule,
        SharedModule,
    ],
    exports: [ HeaderComponent ],
    providers: [
        InterceptorServices,
        TitleService,
    ],
    declarations: [ HeaderComponent ],
})
export class CoreModule {

}
