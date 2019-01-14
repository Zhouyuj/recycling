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
    selector   : 'app-login',
    templateUrl: './login.component.html',
    styleUrls  : [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
    formModel: LoginModel;
    submitBtnValid = false;

    constructor(private router: Router,
                private loginService: LoginService,
                private tokenService: TokenService,
                private messageService: MessageService,
                private notificationService: NotificationService,
                private authorizationService: AuthorizationService) {
    }

    ngOnInit(): void {
        // TODO  isLogin
        this.formModel = new LoginModel();
    }

    onSubmit(): void {
        if (!this.checkForm()) {
            return;
        }
        this.submitBtnValid = true;
        let msgId = this.messageService.create({ type: 'loading', content: '正在登陆,请稍后' });
        this.loginService.auth(this.formModel).subscribe(
            (res: Result<{ token: string }>) => {
                if (res.data.token) {
                    this.messageService.remove(msgId);
                    this.messageService.create({ type: 'success', content: '登陆成功,页面正在跳转' });

                    const token = res.data.token;
                    let deCodePayload = {};
                    deCodePayload = JwtUtils.decode(token);
                    this.authorizationService.setCurrentUser(deCodePayload);
                    this.tokenService.setToken(token);

                    this.redirectToHome();
                }
            },
            err => {
                this.notificationService.create({
                    type   : 'error',
                    title  : '抱歉,用户名或密码错误',
                    content: '只能包含字符、数字',
                });
                this.submitBtnValid = false;
            },
            () => this.submitBtnValid = false
        );
    }

    checkForm(): boolean {
        if (!(/^(([a-zA-Z]|\d){3,17})$/.test(this.formModel.username))) {   // 以字母开头，长度在3-18之间，只能包含字符、数字和下划线 (/^[a-zA-Z](([a-zA-Z]|\d){3,17})$/
            this.notificationService.create({
                type   : 'error',
                title  : '抱歉,请检查用户名',
                content: '只能包含字母、数字',
            });
            return false;
        } else if (!(/^([a-zA-Z]|\d)+$/.test(this.formModel.password))) {
            this.notificationService.create({
                type   : 'error',
                title  : '抱歉,请检查密码',
                content: '只能包含字母、数字',
            });
            return false;
        } else return true;
    }

    redirectToHome(): void {
        this.router.navigateByUrl('/');
    }
}
