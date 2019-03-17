import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RebirthHttp, POST, Body, BaseUrl } from 'rebirth-http';
import { Observable } from 'rxjs/index';
import { Result } from '../../shared/models/response/result.model';
import { environment } from '../../../environments/environment';
import { VerifyUtil } from '../../shared/utils/verify-utils';
import { Token } from '../../core/services/token/token';
import { TokenService } from '../../core/services/token/token.service';

@BaseUrl(environment.wechatApi)
@Injectable({
  providedIn: 'root'
})
export class LoginService extends RebirthHttp {
  constructor(http: HttpClient, private tokenService: TokenService) {
    super(http);
  }

  private _name: string;
  private _addr: string;
  private _username: string;

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get addr() {
    return this._addr;
  }

  set addr(addr: string) {
    this._addr = addr;
  }

  get username() {
    return this._username;
  }

  set username(username: string) {
    this._username = username;
  }

  @POST('/auth')
  auth(@Body body: { username?: string; password?: string }): Observable<
    Result<{ token: string }>
  > {
    return null;
  }
}
