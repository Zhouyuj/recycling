import { NgModule } from '@angular/core';
import { LoginService } from './login.service';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  providers: [LoginService],
  declarations: [LoginComponent],
  imports: [SharedModule]
})
export class LoginModule {}
