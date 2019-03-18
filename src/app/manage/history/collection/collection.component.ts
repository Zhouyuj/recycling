import { OnInit, Component } from '@angular/core';
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
export class CollectionComponent extends TableBasicComponent implements OnInit {
  /* 面包屑导航 */
  breadcrumbs = [
    {
      link: '/',
      title: '首页'
    },
    {
      link: '/manage/history/scheme',
      title: '历史记录'
    }
  ];

  data: [];
  dataSet: any[];
  searchVal: any;
  date: string;
  optionGroups: CustomerRes[];
  searchVal$: any;
  customer: CustomerRes;

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
    console.log(this.customer);
    this.dataSet = [
      {
        date: '1',
        totalQuantity: 0.1,
        detailList: [
          {
            driver: 'aaa'
          }
        ]
      },
      {
        date: '2',
        totalQuantity: 0.13,
        detailList: [
          {
            driver: 'bbb'
          },
          {
            driver: 'ccc'
          }
        ]
      }
    ];
    // if (this.showWarning()) return;
    // this.customersInfoService
    //   .getCustomerCountsByUsernameAndMonth(this.customer.username, this.date)
    //   .subscribe(res => {
    //     this.dataSet = res.data.content;
    //   });
  }

  onExport() {
    if (this.showWarning()) return;
    this.customersInfoService
      .getCustomerCountReport(this.customer.username, this.date)
      .subscribe(res => {
        DownloadReportsService.download(res);
        // this.dataSet = res.data.content;
      });
  }

  onChangeDate(result: Date): void {
    this.date = DateUtil.dateFormat(result, 'yyyy-MM');
  }

  onSearchCustomer(value: string): void {
    fromEvent(document.getElementById('customer'), 'change')
      .pipe(
        map(event => (<HTMLInputElement>event.target).value),
        debounceTime(500),
        mergeMap(v =>
          this.customersInfoService.getCustomerList(this.pageReq, {
            username: v
          })
        )
      )
      .subscribe(res => {
        console.log(res);
        this.optionGroups = res.data.content;
      });
  }

  ngOnInit(): void {}
}
