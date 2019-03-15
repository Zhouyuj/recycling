import { OnInit, Component } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-history-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
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

  searchVal: any;
  date: null;
  optionGroups: any[];
  searchVal$: any;
  inputValue: any;

  onSearch() {
    console.log(this.searchVal);
  }

  onExport() {}

  onChangeDate(result: Date): void {
    console.log('onChange: ', result);
  }

  onChangeSearch(value: any): void {}

  ngOnInit(): void {
    setTimeout(() => {
      var a = fromEvent(document.getElementById('search'), 'input');
      console.log(a, document.getElementById('search'));
      a.pipe(
        map(event => (<HTMLInputElement>event.target).value),
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(
        data => {
          console.log(data);
          this.optionGroups = [
            {
              title: '话题1'
            },
            {
              title: '问题1'
            },
            {
              title: '文章1'
            }
          ];
        },
        err => {
          console.log(err);
        }
      );
      this.optionGroups = [
        {
          title: '话题'
        },
        {
          title: '问题'
        },
        {
          title: '文章'
        }
      ];
    }, 1000);
  }
}
