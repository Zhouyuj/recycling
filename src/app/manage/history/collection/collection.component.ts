import { Component } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  mergeMap
} from 'rxjs/operators';
import { DateUtil } from '../../../shared/utils/date-utils';
import { CustomersInfoService } from '../../base/customers-info/customers-info.service';
import { TableBasicComponent } from '../../../manage/table-basic.component';
import { CustomerRes } from '../../../manage/base/customers-info/customer-res.model';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { DownloadReportsService } from '../../../core/services/reports/downloadReports.service';

@Component({
  selector: 'app-history-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent extends TableBasicComponent {
  /* 面包屑导航 */
  breadcrumbs = [
    {
      link: '/',
      title: '首页'
    },
    {
      link: '',
      title: '历史记录'
    },
    {
      link: '/manage/history/collection',
      title: '收运台账'
    }
  ];

  data: [];
  dataSet: any[];
  searchVal: any;
  date: string;
  optionGroups: CustomerRes[];
  searchVal$: any;
  customer: CustomerRes;
  isSpinning: boolean;

  constructor(
    private customersInfoService: CustomersInfoService,
    private notificationService: NotificationService
  ) {
    super();
  }

  showWarning() {
    if (!this.customer || !this.customer.id) {
      this.notificationService.create({
        type: 'warning',
        content: '请输入收运单位'
      });
      return true;
    }
    if (!this.date) {
      this.notificationService.create({
        type: 'warning',
        content: '请输入日期'
      });
      return true;
    }
  }

  onSearch() {
    if (this.showWarning()) return;
    this.isSpinning = true;
    this.customersInfoService
      .getCustomerCountsByUsernameAndMonth(
        (this.customer && this.customer.name) || 'test',
        this.date
      )
      .subscribe(
        res => {
          this.isSpinning = false;
          if (res.data) {
            console.log(res);
            this.dataSet = res.data.dateList;
          }
        },
        err => {
          this.isSpinning = false;
        }
      );
  }

  onExport() {
    if (this.showWarning()) return;
    this.customersInfoService
      .getCustomerCountReport(
        (this.customer && this.customer.username) || 'test',
        this.date
      )
      .subscribe(res => {
        DownloadReportsService.download(
          res,
          `漳州市餐饮单位餐厨垃圾台账联单记录表.pdf`
        );
      });
  }

  onChangeDate(result: Date): void {
    this.date = DateUtil.dateFormat(result, 'yyyy-MM');
  }

  onSearchCustomer(value: string): void {
    fromEvent(document.getElementById('customer'), 'input')
      .pipe(
        map(event => (<HTMLInputElement>event.target).value),
        debounceTime(500),
        mergeMap(v =>
          this.customersInfoService.getCustomerList(this.pageReq, {
            name: v
          })
        )
      )
      .subscribe(res => {
        this.optionGroups = res.data.content;
      });
  }
}
