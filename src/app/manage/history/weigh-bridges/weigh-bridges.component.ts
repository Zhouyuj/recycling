import { OnInit, Component } from '@angular/core';
import { DateUtil } from '../../../shared/utils/date-utils';
import { NotificationService } from '../../../shared/services/notification/notification.service';

@Component({
  selector: 'app-history-weightbridges',
  templateUrl: './weigh-bridges.component.html',
  styleUrls: ['./weigh-bridges.component.scss']
})
export class WeighBridgesComponent implements OnInit {
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
  date: string;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.date = DateUtil.dateFormat(new Date(), 'yyyy-MM');
  }

  onChangeDate(date: Date) {
    this.date = DateUtil.dateFormat(date, 'yyyy-MM');
  }

  onSearch() {
    if (!this.date) {
      this.notificationService.create({
        type: 'warning',
        content: '请输入日期'
      });
      return;
    }
  }

  onExport() {}
}
