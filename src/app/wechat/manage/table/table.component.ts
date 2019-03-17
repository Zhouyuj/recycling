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
  dataSet: any[];
  username: string;
  name: string;
  addr: string;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private manageService: ManageService,
    private downloadReportsService: DownloadReportsService,
    private tokenService: TokenService
  ) {}
  ngOnInit() {
    this.selectedCal = false;
    this.name = this.loginService.name;
    this.username = this.loginService.username;
    this.selectedMonth = DateUtil.dateFormat(new Date(), 'yyyy-MM');
    // this.addr = this.loginService.addr;
    console.log(this.username, this.selectedMonth);
    this.manageService
      .getCustomerCountsByUsernameAndMonth(this.username, this.selectedMonth)
      .subscribe((res: Result<CustomerCountModel>) => {
        console.log(res);
        let detailList;
        this.dataSet = res.data.dateList.map(d => {
          if (d.detailList.length === 1) {
            detailList = d.detailList;
            d.driver = detailList.driver;
            d.plateNumber = detailList.plateNumber;
          }
          return d;
        });
      });
  }

  onCalendar() {
    this.selectedCal = true;
    this.router.navigateByUrl('/wechat/manage/calendar');
  }

  onTable() {
    this.selectedCal = false;
  }

  onMonthChange(date: Date) {
    this.selectedMonth = DateUtil.dateFormat(date, 'yyyy-MM');
    console.log(date, this.selectedMonth);
  }

  onExport() {
    this.manageService
      .export(this.username, this.selectedMonth)
      .subscribe(res => {
        this.downloadReportsService.download(res, this.username);
      });
  }

  logout() {
    this.router.navigateByUrl('/wechat/login');
    this.tokenService.clearToken();
    this.tokenService.clearLoginInfo();
  }
}
