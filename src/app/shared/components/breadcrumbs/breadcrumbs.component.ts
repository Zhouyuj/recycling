import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector   : 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls  : [ './breadcrumbs.component.scss' ]
})
export class BreadcrumbsComponent implements OnInit {

    /**
     * !!!规则 不可跳转的请把 link: '', 首页 link: '/'
     * eg. 三级面包屑: 首页 > 二级 > 三级, 其中二级不可跳转(无index页面时),
     * options = [ { link: '/',title: '首页' }, { link: '', title: '二级' }, { link: '/third', title: '三级' } ]
     */
    @Input() options: [{ link: string, title: string }];

    constructor() {
    }

    ngOnInit() {
    }

}
