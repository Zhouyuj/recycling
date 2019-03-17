import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Result } from '../../shared/models/response/result.model';
import { TokenService } from '../../core/services/token/token.service';
import { LoginModel } from '../../login/login.model';
import { JwtUtils } from '../../shared/utils/jwt-utils';

@Component({
  selector: 'wechat-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  loginInfo: any;
  form: LoginModel;

  ngOnInit() {
    this.form = new LoginModel();
    this.loginInfo = this.tokenService.getLoginInfo();
    console.log(this.loginInfo);
    if (this.loginInfo) {
      this.loginService.auth(this.loginInfo).subscribe(
        (res: Result<{ token: string }>) => {
          const token = res.data.token;
          this.tokenService.setLoginInfo(this.loginInfo);
          this.tokenService.setToken(token);
          this.router.navigateByUrl('/wechat/manage/calendar');
          console.log(JwtUtils.decode(token));
          this.loginService.name = JwtUtils.decode(token).name;
          this.loginService.username = JwtUtils.decode(token).username;
          // this.loginService.addr = JwtUtils.decode(token).addr;
        },
        err => {
          this.tokenService.clearLoginInfo();
          console.log(err);
        }
      );
    }
  }

  login() {
    this.loginService
      .auth(this.form)
      .subscribe((res: Result<{ token: string }>) => {
        this.tokenService.setLoginInfo(this.form);
        this.router.navigateByUrl('/wechat/manage/calendar');
        this.tokenService.setToken(res.data.token);
        console.log(this.tokenService.getLoginInfo());
      });
  }
}
