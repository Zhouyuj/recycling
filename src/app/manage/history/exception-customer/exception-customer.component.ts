import { Component, OnInit } from '@angular/core';
import { TableBasicComponent } from '../../../manage/table-basic.component';
import { HistoryService } from '../history.service';
import _ from 'lodash';
import { ExceptionCustomerRes } from '../../base/customers-info/customer-res.model';
import { PageRes } from 'src/app/shared/models/page/page-res.model';
import { DateUtil } from 'src/app/shared/utils/date-utils';
import { DownloadReportsService } from 'src/app/core/services/reports/downloadReports.service';

@Component({
  selector: 'app-history-exceptioncustomer',
  templateUrl: './exception-customer.component.html',
  styleUrls: ['./exception-customer.scss']
})
export class ExceptionCustomerComponent extends TableBasicComponent
  implements OnInit {
  /* 面包屑导航 */
  breadcrumbs = [
    {
      link: '/',
      title: '首页'
    },
    {
      link: '/manage/history/scheme',
      title: '历史记录'
    },
    {
      title: '异常商户'
    }
  ];
  address = [];
  street: number;
  dataSet: ExceptionCustomerRes[] = [];
  isSpinning = false;
  date: string;

  constructor(private historyService: HistoryService) {
    super();
  }

  ngOnInit() {
    this.calcTableScrollY(30);
    this.date = DateUtil.dateFormat(new Date(), 'yyyy-MM');
    this.getListByPage();
  }

  onAddressChange(event) {
    this.street = _.last(event);
  }

  onChangeDate(date) {
    this.date = DateUtil.dateFormat(date, 'yyyy-MM');
  }

  onSearch() {
    if (this.date && this.street) this.getListByPage();
  }

  onPageV2(e) {
    this.pageReq.page = e;
    this.getListByPage();
  }

  /**
   * 统一分页获取列表方法
   */
  getListByPage(option?: { isResetReq: boolean }) {
    // if (option && option.isResetReq) {
    //   this.resetPageReq();
    // }
    this.isSpinning = true;
    // 分页接口
    // const paramsTemp = this.updateParams();

    this.historyService
      .getExceptionCustomers(this.date, this.pageReq, this.street)
      .subscribe(
        res => {
          if (res.data.content) {
            this.dataSet = res.data.content;
            /* 更新列表的信息（分页/排序） */
            this.updatePageRes(res.data);
            this.isSpinning = false;
          }
        },
        err => {
          this.isSpinning = false;
          console.error(`分页查询失败!!! message:${err.error.message}`);
        },
        () => (this.isSpinning = false)
      );
  }

  onExport() {
    if (this.date)
      this.historyService
        .exportExceptionCustomerReport(this.date)
        .subscribe(res => {
          DownloadReportsService.download(res, `异常商户信息.xls`);
        });
  }

  /**
   * 目前只存储分页信息,不包括数据
   * @param data
   */
  updatePageRes(data: PageRes<ExceptionCustomerRes[]>): void {
    this.pageRes = new PageRes(
      data.page,
      data.size,
      data.pages,
      data.total,
      data.last
    );
  }
}
