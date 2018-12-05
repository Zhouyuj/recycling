/**
 * Created by wujiahui on 2018/12/4.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApkComponent } from './apk/apk.component';

export const ROUTER_CONFIG: Routes = [
    {
        path    : '',
        children: [
            {
                path: 'apkManagement', component: ApkComponent, data: { title: '应用更新' },
            },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTER_CONFIG),
    ],
    exports: [
        RouterModule
    ],
})
export class SystemRoutingModule {
}

