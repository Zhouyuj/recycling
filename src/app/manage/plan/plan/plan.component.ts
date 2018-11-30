import { Component, OnInit } from '@angular/core';

@Component({
    selector   : 'app-plan',
    templateUrl: './plan.component.html',
    styleUrls  : [ './plan.component.scss' ]
})
export class PlanComponent implements OnInit {
    /* 面包屑导航 */
    breadcrumbs = [
        {
            link : '/',
            title: '首页',
        },
        {
            link : '/manage/plan',
            title: '方案管理',
        },
    ];

    constructor() {
    }

    ngOnInit() {
    }

}
