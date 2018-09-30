import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* 第三方模块 */
import { RebirthNGModule } from 'rebirth-ng/rebirth-ng.module';
/* 自定义模块 */
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        CoreModule,
        SharedModule,
        AppRoutingModule,
        RebirthNGModule.forRoot(),
        BrowserAnimationsModule,
    ],
    providers: [],
    bootstrap: [ AppComponent ],
})
export class AppModule {
}
