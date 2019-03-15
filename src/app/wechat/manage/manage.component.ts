import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wechat-manage',
  templateUrl: './manage.component.html'
})
export class ManageComponent implements OnInit {
  ngOnInit() {
    console.log('wechat manage init');
  }
}
