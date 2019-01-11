/**
 * Created by wujiahui on 2018/9/4.
 */

import { NgModule } from '@angular/core';
/* 第三方 */
import { RebirthHttpModule } from 'rebirth-http';

/* 自定义 */
import { AuthorizationService } from './services/authorization/authorization.service';
import { AuthRoutingGuardService } from './services/authorization/auth-routing-guard.service';
import { InterceptorServices } from './services/interceptors/interceptors.service';
import { StorageService } from './services/storage/storage.service';
import { TitleService } from './services/title/title.service';
import { TokenService } from './services/token/token.service';

@NgModule({
    imports: [
        RebirthHttpModule
    ],
    exports: [],
    providers: [
        AuthorizationService,
        AuthRoutingGuardService,
        InterceptorServices,
        StorageService,
        TitleService,
        TokenService,
    ],
    declarations: [],
})
export class CoreModule {

}
