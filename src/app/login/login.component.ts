import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from './login.model';
import { LoginService } from './login.service';
import { AuthorizationService } from '../core/services/authorization/authorization.service';
import { TokenService } from '../core/services/token/token.service';
import { Result } from '../shared/models/response/result.model';
import { MessageService } from '../shared/services/message/message.service';
import { NotificationService } from '../shared/services/notification/notification.service';
import { JwtUtils } from '../shared/utils/jwt-utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formModel: LoginModel;
  submitBtnValid = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private tokenService: TokenService,
    private messageService: MessageService,
    private notificationService: NotificationService,
    private authorizationService: AuthorizationService
  ) {}

  ngOnInit(): void {
    // TODO  isLogin
    this.formModel = new LoginModel();
  }

  onSubmit(): void {
    if (!this.checkForm()) {
      return;
    }
    this.submitBtnValid = true;
    const msgId = this.messageService.create({
      type: 'loading',
      content: '正在登陆,请稍后'
    });
    this.loginService.auth(this.formModel).subscribe(
      (res: Result<{ token: string }>) => {
        if (res.data.token) {
          const token = res.data.token;
          let deCodePayload = {};
          deCodePayload = JwtUtils.decode(token);
          this.authorizationService.setCurrentUser(deCodePayload);
          this.tokenService.setToken(token);

          this.redirectToHome();
          this.messageService.remove(msgId);
        }
      },
      err => {
        this.messageService.remove(msgId);
        this.submitBtnValid = false;
        this.notificationService.create({
          type: 'error',
          title: '抱歉,请检查用户名或密码',
          content: '用户名或密码不正确'
        });
      },
      () => (this.submitBtnValid = false)
    );
  }

  checkForm(): boolean {
    // 以字母开头，长度在3-18之间，只能包含字符、数字和下划线 (/^[a-zA-Z](([a-zA-Z]|\d){3,17})$/
    if (!/^(([a-zA-Z]|\d){3,17})$/.test(this.formModel.username)) {
      this.notificationService.create({
        type: 'error',
        title: '抱歉,请检查用户名',
        content: '用户名长度在3-18之间，只能包含字母、数字'
      });
      return false;
    }
    if (!/^(([a-zA-Z]|\d){3,17})$/.test(this.formModel.password)) {
      this.notificationService.create({
        type: 'error',
        title: '抱歉,请检查密码',
        content: '密码长度在3-18之间，只能包含字母、数字'
      });
      return false;
    }
    return true;
  }

  redirectToHome(): void {
    this.router.navigateByUrl('/');
  }
}
