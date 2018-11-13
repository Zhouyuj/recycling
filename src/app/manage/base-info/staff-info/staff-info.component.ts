import { Component, OnInit, EventEmitter } from '@angular/core';

import { StaffInfoService } from './staff-info.service';
import { StaffInfoFormComponent } from './staff-info-form/staff-info-form.component';

import { NzDrawerService } from 'ng-zorro-antd';

import { DistrictsService } from '../../../shared/services/districts/districts.service';
import { PageReq } from '../../../shared/models/page/page-req.model';
import { PageRes } from '../../../shared/models/page/page-res.model';
import { Result } from '../../../shared/models/response/result.model';
import { StaffRes } from './staff-res.model';
import { StaffFormModel } from './staff-form.model';

@Component({
    selector   : 'app-staff-info',
    templateUrl: './staff-info.component.html',
    styleUrls  : [ './staff-info.component.scss' ]
})
export class StaffInfoComponent implements OnInit {

    breadcrumbs = [
        {
            link : '/',
            title: '首页',
        },
        {
            link : '',
            title: '基础信息',
        },
        {
            link : '/manage/baseInfo/staffs',
            title: '人员信息',
        }
    ];

    public list_options = {
        rows               : [],
        selectedRows       : [],
        localizationMessage: {
            emptyMessage   : '很抱歉, 未找到任何数据！',
            totalMessage   : '条记录(共)',
            selectedMessage: '已选中',
        },
    };

    // TODO
    public pageReq = new PageReq();
    public params: any = {};// 分页查询参数
    public keywordType = 'plateNumber';
    public keyword: string;

    public listCache: StaffRes[];
    public itemCache: StaffRes;
    public formCache: StaffFormModel;

    constructor(private staffInfoService: StaffInfoService,
                private districtsService: DistrictsService,
                private drawerService: NzDrawerService) {
    }

    ngOnInit() {
        this.districtsService.getDistricts('350600', 1).subscribe(res => {

            this.staffInfoService.getListByPage().subscribe((res: Result<PageRes<StaffRes[]>>) => {
                this.list_options.rows = res.data.content;
                console.log(this.list_options.rows);
            });
        });
    }

    onAdd() {
        console.log('add');
        this.onOpenForm('add');
    }

    onEdit() {
        console.log('edit', this.list_options.selectedRows);
        this.onOpenForm('edit');
    }

    onDel() {
        console.log('del', this.list_options.selectedRows);
    }

    onExp() {
        console.log('exp');
    }

    onSelect($e) {
        console.log($e, this.list_options.selectedRows);
    }

    onSelectFilter($e) {
        console.log($e);
    }

    onSelectEmitter($e) {
        let requestParams = ''; // 拼接过滤的条件
        switch ($e.type) {
            case '岗位':
                console.log($e.id);
                break;
            case '系统角色':
                break;
            default:
                break;
        }
    }

    onUpdateFilter($e) {
        console.log($e);
    }

    onPage($e) {
        console.log($e);
    }

    getListByPage(page, params?) {
        // 分页接口
    }

    /**
     * 抽屉组件
     * form 表单
     */
    onOpenForm(type: string): void {
        const drawerRef = this.drawerService.create<StaffInfoFormComponent>({
            nzTitle  : { add: '添加', edit: '编辑' }[ type ] || '请编辑表单',
            nzContent: StaffInfoFormComponent,
            nzWidth  : '55%',
        });

        drawerRef.afterOpen.subscribe(() => {
            console.log('Drawer(Component) open');
        });

        drawerRef.afterClose.subscribe(res => {
            console.log('Drawer(Component) close');
            if (res) {
                // 重新调分页接口
                this.getListByPage(this.pageReq, this.params);
            }
        });
    }
}
