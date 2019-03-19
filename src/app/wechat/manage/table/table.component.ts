import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { ManageService } from '../manage.service';
import { DateUtil } from '../../../shared/utils/date-utils';
import { Result } from '../../../shared/models/response/result.model';
import { CustomerCountModel } from '../model/customer-count.model';
import { DownloadReportsService } from '../../../core/services/reports/downloadReports.service';
import { TokenService } from '../../../core/services/token/token.service';

@Component({
  selector: 'wechat-manage-table',
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
  isSpinning: boolean = true;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private manageService: ManageService,
    private tokenService: TokenService
  ) {}
  ngOnInit() {
    this.selectedCal = false;
    this.selectedMonth = DateUtil.dateFormat(new Date(), 'yyyy-MM');
    const loginInfo = this.tokenService.getLoginInfo();
    if (loginInfo) {
      this.name = loginInfo.name;
      this.username = loginInfo.username;
    }
    console.log(this.username, this.selectedMonth);
    this.manageService
      .getCustomerCountsByUsernameAndMonth(this.username, this.selectedMonth)
      .subscribe(
        (res: Result<CustomerCountModel>) => {
          this.isSpinning = false;
          this.addr = res.data.address;
          this.dataSet = res.data.dateList;
          console.log(this.dataSet);
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
          console.log(this.dataSet);
        },
        err => {
          this.isSpinning = false;
        }
      );
  }

  onExport() {
    this.manageService
      .export(this.username, this.selectedMonth)
      .subscribe(res => {
        DownloadReportsService.download(res, this.username);
      });
  }

  logout() {
    this.router.navigateByUrl('/wechat/login');
    this.tokenService.clearToken();
    this.tokenService.clearLoginInfo();
  }
}
