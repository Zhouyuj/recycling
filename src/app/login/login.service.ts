import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RebirthHttp, POST, Body } from 'rebirth-http';
import { Observable } from 'rxjs/index';
import { Result } from '../shared/models/response/result.model';
import { environment } from '../../environments/environment';
import { VerifyUtil } from '../shared/utils/verify-utils';
import { Token } from '../core/services/token/token';
import { TokenService } from '../core/services/token/token.service';

/*@Injectable({
    providedIn: 'root'
})
export class LoginService extends RebirthHttp {

    constructor(http: HttpClient) {
        super(http);
    }

    @POST('/auth')
    auth(@Body body: { username?: string, password?: string }): Observable<Result<{ token: string }>> {
        return null;
    }
}*/

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient,
                private tokenService: TokenService) {
    }

    isLogin(): boolean {
        let token: Token = this.tokenService.getToken();
        if (VerifyUtil.isNotEmpty(token)) {
            return true;
        }
        return false;
    }

    auth(body: { username?: string, password?: string }): Observable<Result<{ token: string }>> {
        return this.http.post(
            `${environment.api}/auth`,
            body
        );
    }

}
