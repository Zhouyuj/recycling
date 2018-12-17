import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/index';

import { AuthorizationService } from './authorization.service';
import { TokenService } from '../token/token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthRoutingGuardService {
    private url: string;

    constructor(private authorizationService: AuthorizationService,
                private tokenService: TokenService,
                private router: Router) {
        this.url = 'login';
    }


    public canActivate(route: ActivatedRouteSnapshot,
                       state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const isLogin = this.authorizationService.isLogin();
        if (!isLogin) {
            this.tokenService.clearToken();
            this.router.navigateByUrl(this.url);
        }

        return isLogin;
    }
}
