import { NgModule } from '@angular/core';
import { WechatRoutingModule } from './wechat-routing.module';
import { LoginModule } from './login/login.module';
import { ManageModule } from './manage/manage.module';
import { WechatComponent } from './wechat.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [WechatComponent],
  imports: [WechatRoutingModule, LoginModule, ManageModule, SharedModule]
})
export class WechatModule {}
