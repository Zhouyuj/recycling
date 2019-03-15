import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../core/services/token/token.service';

@Component({
  selector: 'wechat-manage-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['../manage.component.scss']
})
export class CalendarComponent implements OnInit {
  selectedCal: boolean;
  constructor(private router: Router) {}
  ngOnInit() {
    this.selectedCal = true;
  }

  listDataMap = {
    eight: [{ type: 'warning', content: 'T' }]
  };

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }

  onCalendar() {
    this.selectedCal = true;
  }

  onTable() {
    this.selectedCal = false;
    this.router.navigateByUrl('wechat/manage/table');
  }
}
