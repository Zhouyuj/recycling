import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../core/services/token/token.service';
import { LoginService } from '../../login/login.service';
import { ManageService } from '../manage.service';
import { DateUtil } from '../../../shared/utils/date-utils';
import { Result } from '../../../shared/models/response/result.model';
import { CustomerCountModel } from '../model/customer-count.model';

@Component({
  selector: 'wechat-manage-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['../manage.component.scss']
})
export class CalendarComponent implements OnInit {
  selectedCal: boolean;
  name: string;
  addr: string;
  username: string;
  calendarData: any[];
  constructor(
    private router: Router,
    private loginService: LoginService,
    private manageService: ManageService,
    private tokenService: TokenService
  ) {}
  ngOnInit() {
    this.selectedCal = true;
    this.name = this.loginService.name;
    this.username = this.loginService.username;
    this.calendarData = [
      { totalQuantity: 0.11, date: 1, type: 'success' },
      { totalQuantity: 0.11, date: 4, type: 'success' },
      { totalQuantity: 0.19, date: 6, type: 'success' },
      { totalQuantity: 0.01, date: 8, type: 'success' },
      { totalQuantity: 0.11, date: 10, type: 'success' },
      { totalQuantity: 0.21, date: 12, type: 'success' },
      { totalQuantity: 0.15, date: 13, type: 'success' },
      { totalQuantity: 0.12, date: 16, type: 'success' },
      { totalQuantity: 0.01, date: 18, type: 'success' }
    ];
    this.manageService
      .getCustomerCountsByUsernameAndMonth(
        this.username,
        DateUtil.dateFormat(new Date(), 'yyyy-MM')
      )
      .subscribe(
        (res: Result<CustomerCountModel>) => {
          console.log(res);
          // this.addr = res.data.content.address;
          // this.loginService.addr = this.addr;
          // this.calendarData = [];
        },
        err => {
          console.log(err);
        }
      );
  }

  onCalendar() {
    this.selectedCal = true;
  }

  onTable() {
    this.selectedCal = false;
    this.router.navigateByUrl('wechat/manage/table');
  }

  logout() {
    this.router.navigateByUrl('/wechat/login');
    this.tokenService.clearToken();
    this.tokenService.clearLoginInfo();
  }
}
