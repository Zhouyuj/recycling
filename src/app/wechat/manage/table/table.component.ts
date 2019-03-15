import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'wechat-manage-table',
  templateUrl: './table.component.html',
  styleUrls: ['../manage.component.scss']
})
export class TableComponent implements OnInit {
  selectedCal: boolean;
  selectedMonth: any;
  dataSet: any[];
  constructor(private router: Router) {}
  ngOnInit() {
    this.selectedCal = false;
    this.dataSet = [
      {
        time: '1日',
        collection: '0.1',
        vehicle: '粤Y00000',
        driver: '老司机0'
      },
      { time: '2日', collection: '0.1', vehicle: '粤Y22223', driver: '老司机' },
      { time: '3日', collection: '0.1', vehicle: '粤Y33333', driver: '老司机' },
      { time: '4日', collection: '0.1', vehicle: '粤Y44444', driver: '老司机' },
      { time: '5日', collection: '0.1', vehicle: '粤Y55555', driver: '老司机' },
      { time: '6日', collection: '0.2', vehicle: '粤Y11111', driver: '老司机1' }
    ];
  }

  onCalendar() {
    this.selectedCal = true;
    this.router.navigateByUrl('/wechat/manage/calendar');
  }

  onTable() {
    this.selectedCal = false;
  }

  onMonthChange(date: Date) {
    console.log(date);
  }
}
