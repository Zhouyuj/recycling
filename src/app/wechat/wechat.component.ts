import { Component } from '@angular/core';
import { InterceptorServices } from '../core/services/interceptors/interceptors.service';
import { TitleService } from '../core/services/title/title.service';

@Component({
  selector: 'wechat',
  templateUrl: './wechat.component.html',
  styleUrls: ['./wechat.component.scss']
})
export class WechatComponent {
  constructor(
    /*private rebirthNGConfig: RebirthNGConfig,
                private viewContainerRef: ViewContainerRef,*/
    private interceptorServices: InterceptorServices,
    private titleService: TitleService
  ) {
    // this.rebirthNGConfig.rootContainer = this.viewContainerRef;

    /* http 拦截器 */
    this.interceptorServices.registInterceptors('wechat');

    /* 监听路由变化以修改title */
    this.titleService.updateTitleAfterNavigated();
  }
}
