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
  selectedDate: Date;
  name: string;
  addr: string;
  username: string;
  calendarData: any[];
  isSpinning: boolean = true;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private manageService: ManageService,
    private tokenService: TokenService
  ) {}
  ngOnInit() {
    this.selectedCal = true;
    const loginInfo = this.tokenService.getLoginInfo();
    if (loginInfo) {
      this.name = loginInfo.name;
      this.username = loginInfo.username;
    }
    this.manageService
      .getCustomerCountsByUsernameAndMonth(
        this.username,
        DateUtil.dateFormat(new Date(), 'yyyy-MM')
      )
      .subscribe(
        (res: Result<CustomerCountModel>) => {
          this.isSpinning = false;
          this.addr = res.data.address;
          this.loginService.addr = this.addr;
          this.calendarData = res.data.dateList;
        },
        err => {
          this.isSpinning = false;
        }
      );
  }

  onChangeDate(date: Date): void {
    const filterDate = DateUtil.dateFormat(new Date(date), 'yyyy-MM');
    this.isSpinning = true;
    this.manageService
      .getCustomerCountsByUsernameAndMonth(this.username, filterDate)
      .subscribe(
        (res: Result<CustomerCountModel>) => {
          this.isSpinning = false;
          this.addr = res.data.address;
          this.loginService.addr = this.addr;
          this.calendarData = res.data.dateList;
        },
        err => {
          this.isSpinning = false;
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
