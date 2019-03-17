/**
 * Created by wujiahui on 2018/9/5.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/index';
/* 第三方 */
import { RebirthHttpProvider, GET, Query, RebirthHttp } from 'rebirth-http';
/* 自定义 */
import { environment } from '../../../../environments/environment';
import { AuthorizationService } from '../authorization/authorization.service';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { TokenService } from '../token/token.service';

@Injectable()
export class InterceptorServices extends RebirthHttp {
  constructor(
    http: HttpClient,
    private router: Router,
    private rebirthHttpProvider: RebirthHttpProvider,
    private authorizationService: AuthorizationService,
    private notificationService: NotificationService,
    private tokenService: TokenService
  ) {
    super(http);
  }

  public registInterceptors(remark: string) {
    let url = environment.api;
    if (remark === 'wechat') url = environment.wechatApi;

    this.rebirthHttpProvider
      .baseUrl(url)
      .addInterceptor({
        request: (request: HttpRequest<any>) => {
          const token = this.tokenService.getToken();
          if (token) {
            return request.clone({
              setHeaders: { Authorization: 'Bearer ' + token }
            });
          }
          return request;
        }
      })

      /** 无认证响应错误拦截 **/
      .addResponseErrorInterceptor(err => {
        console.error('global interceptor err:::', err);

        if (remark === 'wechat') return;
        if (err.status === 400) {
          this.notificationService.create({
            type: 'error',
            title: '【400】请求失败',
            content: err.error.message
          });
        } else if (err.status === 401 || err.status === 403) {
          this.notificationService.create({
            type: 'error',
            title: '抱歉,您无权访问',
            content: '请重新登录'
          });
          this.tokenService.clearToken();
          this.tokenService.clearLoginInfo();
          this.router.navigateByUrl('/login');
        } else if (err.status === 404) {
          this.notificationService.create({
            type: 'error',
            title: '【404】请求失败',
            content: err.error.message
          });
        }
      });
  }
}
