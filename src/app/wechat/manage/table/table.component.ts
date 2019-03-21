import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { ManageService } from '../manage.service';
import { DateUtil } from '../../../shared/utils/date-utils';
import { Result } from '../../../shared/models/response/result.model';
import { CustomerCountModel } from '../model/customer-count.model';
import { DownloadReportsService } from '../../../core/services/reports/downloadReports.service';
import { TokenService } from '../../../core/services/token/token.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-wechat-manage-table',
  templateUrl: './table.component.html',
  styleUrls: ['../manage.component.scss']
})
export class TableComponent implements OnInit {
  selectedCal: boolean;
  selectedMonth: any;
  dataSet: any[] = [];
  username: string;
  name: string;
  addr: string;
  isSpinning = true;
  isExport = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private manageService: ManageService,
    private tokenService: TokenService
  ) {
    this.dataSet = [];
  }

  ngOnInit() {
    document.body.style.minWidth = 'unset';

    this.selectedCal = false;
    this.selectedMonth = DateUtil.dateFormat(new Date(), 'yyyy-MM');
    const loginInfo = this.tokenService.getLoginInfo();
    if (loginInfo) {
      this.name = loginInfo.name;
      this.username = loginInfo.username;
    }
    this.manageService
      .getCustomerCountsByUsernameAndMonth(this.username, this.selectedMonth)
      .subscribe(
        (res: Result<CustomerCountModel>) => {
          this.isSpinning = false;
          this.addr = res.data.address;
          this.dataSet = res.data.dateList;

        },
        err => {
          this.isSpinning = false;
        }
      );
  }

  onCalendar() {
    this.selectedCal = true;
    this.router.navigateByUrl('/wechat/manage/calendar');
  }

  onTable() {
    this.selectedCal = false;
  }

  onMonthChange(date: Date) {
    this.isSpinning = true;

    this.selectedMonth = DateUtil.dateFormat(date, 'yyyy-MM');
    this.manageService
      .getCustomerCountsByUsernameAndMonth(this.username, this.selectedMonth)
      .subscribe(
        (res: Result<CustomerCountModel>) => {
          this.isSpinning = false;
          this.dataSet = res.data.dateList;
        },
        err => {
          this.isSpinning = false;
        }
      );
  }

  onExport() {
    const a = document.createElement('a');
    a.href = `${environment.wechatApi}/customerCounts/export/${this.username}/${this.selectedMonth}`;
    a.download = '漳州市餐饮单位餐厨垃圾台账联单记录表.pdf';
    const span = document.createElement('span');
    a.appendChild(span);
    document.body.appendChild(a);
    span.click();
  }

  logout() {
    this.router.navigateByUrl('/wechat/login');
    this.tokenService.clearToken();
    this.tokenService.clearLoginInfo();
  }
}
