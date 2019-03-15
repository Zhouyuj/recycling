import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { Result } from '../../shared/models/response/result.model';
import { TokenService } from '../../core/services/token/token.service';
import { LoginModel } from '../../login/login.model';

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
      this.loginService
        .auth(this.loginInfo)
        .subscribe((res: Result<{ token: string }>) => {
          this.router.navigateByUrl('/wechat/manage/calendar');
        });
    }
  }

  login() {
    this.loginService
      .auth(this.form)
      .subscribe((res: Result<{ token: string }>) => {
        this.tokenService.setLoginInfo(this.form);
        this.router.navigateByUrl('/wechat/manage/calendar');
        console.log(this.tokenService.getLoginInfo());
      });
  }
}
