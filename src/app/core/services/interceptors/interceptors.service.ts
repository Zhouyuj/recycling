/**
 * Created by wujiahui on 2018/9/5.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/index';
/* 第三方 */
import { RebirthHttpProvider, GET, Query, RebirthHttp } from 'rebirth-http';
/* 自定义 */
import { environment } from '../../../../environments/environment';
import { AuthorizationService } from '../authorization/authorization.service';
import {TokenService} from '../token/token.service';

@Injectable()
export class InterceptorServices extends RebirthHttp {

    constructor(http: HttpClient,
                private rebirthHttpProvider: RebirthHttpProvider,
                private authorizationService: AuthorizationService,
                private tokenService: TokenService) {
        super(http);
    }

    public registInterceptors() {
        /*this.rebirthHttpProvider
            .baseUrl(environment.api.host)
            .addInterceptor({
                request: request => {
                    if (ignoreLoading(request)) {
                        return;
                    }
                    this.loadingService.show();
                },
                response: () => {
                    this.loadingService.hide();
                },
            })
            .addInterceptor({
                request: request => {
                    const currentUser = this.authorizationService.getCurrentUser();
                    if (currentUser) {
                        return request.clone({
                            setHeaders: { Authorization: `Bearer ${currentUser.token}` },
                        });
                    }
                },
            })
            .addResponseErrorInterceptor((res: HttpErrorResponse) => {
                if (res.status && [401, 403].indexOf(res.status) !== -1) {
                    this.router.navigateByUrl('/login');
                }
            });*/
        this.rebirthHttpProvider
            .baseUrl(environment.api)
            .addInterceptor({
                request: (request: HttpRequest<any>) => {
                    const token = this.tokenService.getToken();
                    if (token) {
                        return request.clone({
                            setHeaders: { Authorization: 'Bearer ' + token },
                        })
                    }
                    return request;
                },
            })
            /** 无认证响应错误拦截 **/
            .addResponseErrorInterceptor((err) => {
                if (err.status === 401) {
                    console.error(`401::${err}`);
                }
            });

        console.log('register interceptor successfully');
    }
}
