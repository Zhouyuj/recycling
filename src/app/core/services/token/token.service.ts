import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';

import { Base64Utils } from '../../../shared/utils/base64-utils';
import {
  RebirthHttp,
  RebirthHttpProvider,
  Headers,
  POST,
  Body,
  Query,
  BaseUrl
} from 'rebirth-http';
import { StorageType } from '../storage/storage-type.enum';
import { StorageService } from '../storage/storage.service';
import { Token, PASSWORD, USERNAME } from './token';
import { environment } from '../../../../environments/environment';
import {} from 'rebirth-http/rebirth-http';
import { LoginModel } from '../../../login/login.model';

@BaseUrl(environment.api)
@Injectable({
  providedIn: 'root'
})
export class TokenService extends RebirthHttp {
  private static STORAGE_POOL_KEY = 'fjzz-authorization';
  private static STORAGE_KEY = 'auth-token';
  private static STORAGE_LOGIN_INFO = 'login-info';
  token: { Authorization: string };

  constructor(http: HttpClient, private storageService: StorageService) {
    super(http);
    this.storageService.setDefaultStorageType(StorageType.localStorage);
  }

  @POST('/auth')
  // @Headers({ 'Authorization': 'Basic ' + new Buffer(USERNAME + ':' + PASSWORD).toString('base64') })
  public refreshToken(@Body
  obj: {
    grant_type: string;
    refresh_token: string;
  }): Observable<Token> {
    return null;
  }

  @POST('/auth')
  // @Headers({ 'Authorization': 'Basic ' + new Buffer(USERNAME + ':' + PASSWORD).toString('base64') })
  public getTokenInfo(@Body
  obj: {
    username: string;
    password: string;
    grant_type?: string;
  }): Observable<any> {
    return null;
  }

  public clearToken(): void {
    this.storageService.remove({
      pool: TokenService.STORAGE_POOL_KEY,
      key: TokenService.STORAGE_KEY
    });
  }

  // TODO 应该传入的是 Token 类型
  public setToken(token: any): void {
    this.storageService.put(
      { pool: TokenService.STORAGE_POOL_KEY, key: TokenService.STORAGE_KEY },
      token
    );
  }

  // TODO 应该返回 Token 类型
  public getToken(): any {
    return this.storageService.get({
      pool: TokenService.STORAGE_POOL_KEY,
      key: TokenService.STORAGE_KEY
    });
  }

  public setLoginInfo(loginInfo: LoginModel): void {
    this.storageService.put(
      {
        pool: TokenService.STORAGE_POOL_KEY,
        key: TokenService.STORAGE_LOGIN_INFO
      },
      { username: loginInfo.username, password: loginInfo.password }
    );
  }

  public getLoginInfo(): any {
    return this.storageService.get({
      pool: TokenService.STORAGE_POOL_KEY,
      key: TokenService.STORAGE_LOGIN_INFO
    });
  }
}
