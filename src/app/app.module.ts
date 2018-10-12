import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* 第三方模块 */
import { RebirthNGModule } from 'rebirth-ng/rebirth-ng.module';

/* antd start */
import { NZ_I18N, zh_CN } from 'ng-zorro-antd';
/* 配置 angular i18n */
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);
/* antd end */

/* 自定义模块 */
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports     : [
        BrowserModule,
        CoreModule,
        SharedModule,
        AppRoutingModule,
        RebirthNGModule.forRoot(),
        BrowserAnimationsModule,
    ],
    providers   : [
    /** 配置 ng-zorro-antd 国际化 **/
        { provide: NZ_I18N, useValue: zh_CN },
    ],
    bootstrap   : [ AppComponent ],
})
export class AppModule {
}
