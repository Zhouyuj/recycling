/**
 * Created by wujiahui on 2018/9/4.
 */

import { NgModule } from '@angular/core';
import { RebirthHttpModule } from 'rebirth-http';
import { RebirthNGModule } from 'rebirth-ng';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
    imports: [
        RebirthHttpModule,
        RebirthNGModule.forRoot()
    ],
    exports: [ HeaderComponent ],
    providers: [],
    declarations: [ HeaderComponent ],
})
export class CoreModule {

}
