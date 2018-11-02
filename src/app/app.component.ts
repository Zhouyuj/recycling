import { Component, ViewContainerRef } from '@angular/core';

/* 第三方 */
import { RebirthNGConfig } from 'rebirth-ng';

/* 自定义 */
import { InterceptorServices } from './core/services/interceptors/interceptors.service';
import { TitleService } from './core/services/title/title.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
})
export class AppComponent {

    constructor(private rebirthNGConfig: RebirthNGConfig,
                private viewContainerRef: ViewContainerRef,
                private interceptorServices: InterceptorServices,
                private titleService: TitleService) {

        this.rebirthNGConfig.rootContainer = this.viewContainerRef;

        /* http 拦截器 */
        this.interceptorServices.registInterceptors();

        /* 监听路由变化以修改title */
        this.titleService.updateTitleAfterNavigated();
    }
}
