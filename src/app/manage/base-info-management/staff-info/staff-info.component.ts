import { Component, OnInit, EventEmitter } from '@angular/core';

import { StaffInfoService } from './staff-info.service';
import { StaffInfoFormComponent } from './staff-info-form/staff-info-form.component';

import { NzDrawerService } from 'ng-zorro-antd';

@Component({
    selector   : 'app-staff-info',
    templateUrl: './staff-info.component.html',
    styleUrls  : [ './staff-info.component.scss' ]
})
export class StaffInfoComponent implements OnInit {

    public list_options = {
        rows               : [],
        selectedRows       : [],
        localizationMessage: {
            emptyMessage   : '未找到任何数据！',
            totalMessage   : '条记录  可配合使用CTRL与SHIFT进行多选',
            selectedMessage: '已选中',
        },
    };

    public selected_system_role = null;
    public selected_system_roles_options = [
        {
            id  : 0,
            name: '全选',
        },
        {
            id  : 1,
            name: '系统管理员',
        },
        {
            id  : 2,
            name: '司机',
        },
        {
            id  : 3,
            name: '中控',
        },
    ];
    public selected_system_position = null;
    public selected_system_positions_options = [
        {
            id: 0,
            name: '全选',
        },
        {
            id: 1,
            name: '司机',
        },
        {
            id: 2,
            name: '辅助工',
        },
    ];

    constructor(private staffInfoService: StaffInfoService,
                private drawerService: NzDrawerService) {
    }

    ngOnInit() {
        this.staffInfoService.mockListData().subscribe(res => {
            this.list_options.rows = res;
        });
    }

    onAdd() {
        console.log('add');
        this.onOpenForm();
    }

    onEdit($e) {
        console.log('edit', this.list_options.selectedRows);
        this.onOpenForm();
    }

    onDel($e) {
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

    asyncGetDataByPage() {
        // 分页接口
    }

    /**
     * 抽屉组件
     * form 表单
     */
    onOpenForm(): void {
        const drawerRef = this.drawerService.create<StaffInfoFormComponent, { value: string }, string>({
            nzTitle: '添加',
            nzContent: StaffInfoFormComponent,
            nzContentParams: {
                value: this.value
            },
            nzWidth: '45%',
        });

        drawerRef.afterOpen.subscribe(() => {
            console.log('Drawer(Component) open');
        });

        drawerRef.afterClose.subscribe(data => {
            console.log(data);
            if (typeof data === 'string') {
                this.value = data;
            }
        });
    }
}
