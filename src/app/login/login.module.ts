/**
 * Created by wujiahui on 2018/9/5.
 */
import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

@NgModule({
    imports: [
        //CoreModule,
        SharedModule,
        LoginRoutingModule,
    ],
    declarations: [ LoginComponent ],
    providers: [ LoginService ],
})
export class LoginModule {
}
