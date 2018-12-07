import { Component, OnInit } from '@angular/core';
import {PageReq} from '../../../shared/models/page/page-req.model';
import {PageRes} from '../../../shared/models/page/page-res.model';

@Component({
    selector   : 'app-edit-plan',
    templateUrl: './edit-plan.component.html',
    styleUrls  : [ './edit-plan.component.scss' ]
})
export class EditPlanComponent implements OnInit {
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
        {
            link : '/manage/plan/edit',
            title: '编辑',
        },
    ];

    pageReq = new PageReq();
    pageRes = new PageRes();
    constructor() {
    }

    ngOnInit() {
        console.log('this is edit plan');
    }

}
