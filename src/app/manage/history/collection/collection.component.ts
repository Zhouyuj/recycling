import { OnInit, Component } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { DateUtil } from '../../../shared/utils/date-utils';
import { CustomersInfoService } from '../../base/customers-info/customers-info.service';
import { TableBasicComponent } from '../../../manage/table-basic.component';

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
  optionGroups: any[];
  searchVal$: any;
  customer: string;

  constructor(private customersInfoService: CustomersInfoService) {
    super();
  }

  onSearch() {
    console.log(this.customer);
  }

  onExport() {}

  onChangeDate(result: Date): void {
    this.date = DateUtil.dateFormat(result, 'yyyy-MM');
    console.log('ondate: ', this.date);
  }

  onSearchCustomer(value: string): void {
    fromEvent(document.getElementById('customer'), 'change')
      .pipe(
        debounceTime(500),
        // distinctUntilChanged(),
        map(event => (<HTMLInputElement>event.target).value)
        // map(v => this.customersInfoService.getCustomerList(this.pageReq, v))
      )
      .subscribe(data => {
        console.log(data);
      });
  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   var a = fromEvent(document.getElementById('customer'), 'input');
    //   console.log(a, document.getElementById('customer'));
    //   a.pipe(
    //     map(event => (<HTMLInputElement>event.target).value),
    //     debounceTime(500),
    //     distinctUntilChanged()
    //   ).subscribe(
    //     data => {
    //       console.log(data);
    //       this.optionGroups = [
    //         {
    //           title: '话题1'
    //         },
    //         {
    //           title: '问题1'
    //         },
    //         {
    //           title: '文章1'
    //         }
    //       ];
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
    //   this.optionGroups = [
    //     {
    //       title: '话题'
    //     },
    //     {
    //       title: '问题'
    //     },
    //     {
    //       title: '文章'
    //     }
    //   ];
    // }, 1000);
  }
}
