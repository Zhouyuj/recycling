/**
 * Created by wujiahui on 2018/9/5.
 */
import { Injectable } from '@angular/core';
/* 第三方 */
import { RebirthHttpProvider } from 'rebirth-http';
/* 自定义 */
import { environment } from '../../../../environments/environment';

@Injectable()
export class InterceptorServices {

    constructor(private rebirthHttpProvider: RebirthHttpProvider) {
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
        console.log('registInterceptor successfully');
    }
}
