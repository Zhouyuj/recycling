import { TableBasicComponent } from '../../table-basic.component';
import { Component, OnInit } from '@angular/core';
import { DateUtil } from 'src/app/shared/utils/date-utils';

@Component({
  selector: 'app-history-statistic',
  templateUrl: './statistic.component.html'
  // styleUrls: ['./statistic.scss']
})
export class StatisticComponent extends TableBasicComponent implements OnInit {
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
      title: '业务统计'
    }
  ];
  address = [];
  street: number;
  dataSet = [];
  isSpinning = false;
  date: string;

  constructor() {
    super();
  }

  ngOnInit() {
    this.calcTableScrollY(30);
    // this.date = DateUtil.dateFormat(new Date(), 'yyyy-MM');
    // this.getListByPage();
  }
}
