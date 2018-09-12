/**
 * Created by wujiahui on 2018/9/5.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

const ROUTER_CONFIG: Routes = [
    {
        path: '', component: LoginComponent,
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTER_CONFIG),
    ],
    exports: [
        RouterModule
    ],
})
export class LoginRoutingModule {

}
