import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, map, mergeMap } from 'rxjs/operators';
import { ManageService } from '../manage.service';
import { DateUtil } from '../../../shared/utils/date-utils';
import { Result } from '../../../shared/models/response/result.model';
import { TableBasicComponent } from '../../../manage/table-basic.component';
import { CustomerCountModel } from '../model/customer-count.model';
import { TokenService } from '../../../core/services/token/token.service';
import { environment } from '../../../../environments/environment';
import { CustomerRes } from '../../../../app/manage/base/customers-info/customer-res.model';
@Component({
  selector: 'app-wechat-manage-table',
  templateUrl: './table.component.html',
  styleUrls: ['../manage.component.scss']
})
export class TableComponent extends TableBasicComponent implements OnInit {
  selectedCal: boolean;
  selectedMonth: any;
  dataSet: any[] = [];
  username: string;
  name: string;
  addr: string;
  isAdmin: boolean = false;
  customer: CustomerRes;
  optionGroups: CustomerRes[];
  isSpinning = true;
  isExport = false;

  constructor(
    private router: Router,
    private manageService: ManageService,
    private tokenService: TokenService
  ) {
    super();
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
      this.isAdmin = this.username.startsWith('admin');
    }
    if (!this.isAdmin)
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

  onSearchCustomer(value: string): void {
    this.pageReq.size = 30;
    fromEvent(document.getElementById('customer'), 'input')
      .pipe(
        map(event => (<HTMLInputElement>event.target).value),
        debounceTime(1500),
        mergeMap(v => this.manageService.getCustomerList(v))
      )
      .subscribe(res => {
        if (res.data) {
          this.optionGroups = res.data;
        }
      });
  }

  onCalendar() {
    this.selectedCal = true;
    this.router.navigateByUrl('/wechat/manage/calendar');
  }

  onTable() {
    this.selectedCal = false;
  }

  onSearch() {
    if (this.customer)
      this.manageService
        .getCustomerCountsByUsernameAndMonth(
          this.customer.username,
          this.selectedMonth
        )
        .subscribe(
          (res: Result<CustomerCountModel>) => {
            this.isSpinning = false;
            this.dataSet = res.data.dateList;
            this.addr = res.data.address;
            this.name = res.data.name;
          },
          err => {
            this.isSpinning = false;
          }
        );
  }

  onMonthChange(date: Date) {
    this.isSpinning = true;

    this.selectedMonth = DateUtil.dateFormat(date, 'yyyy-MM');
    this.manageService
      .getCustomerCountsByUsernameAndMonth(
        (this.customer && this.customer.username) || this.username,
        this.selectedMonth
      )
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
    a.href = `${environment.wechatApi}/customerCounts/export/${(this.customer &&
      this.customer.username) ||
      this.username}/${this.selectedMonth}`;
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
