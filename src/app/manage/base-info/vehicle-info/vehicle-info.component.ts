import { Component, OnInit, EventEmitter } from '@angular/core';

import { VehicleInfoFormComponent } from './vehicle-info-form/vehicle-info-form.component';
import { VehicleInfoService } from './vehicle-info.service';

import { NzDrawerService } from 'ng-zorro-antd';

@Component({
    selector   : 'app-vehicle-info',
    templateUrl: './vehicle-info.component.html',
    styleUrls  : [ './vehicle-info.component.scss' ]
})
export class VehicleInfoComponent implements OnInit {

    breadcrumbs = [
        {
            link: '/',
            title: '首页',
        },
        {
            link: '',
            title: '基础信息',
        },
        {
            link: '/manage/baseInfo/vehicles',
            title: '车辆信息',
        }
    ];

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
            id  : 0,
            name: '全选',
        },
        {
            id  : 1,
            name: '司机',
        },
        {
            id  : 2,
            name: '辅助工',
        },
    ];

    constructor(private vehicleInfoService: VehicleInfoService,
                private drawerService: NzDrawerService) {
    }

    ngOnInit() {
        this.vehicleInfoService.mockListData().subscribe(res => {
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
        const drawerRef = this.drawerService.create<VehicleInfoFormComponent>({
            nzTitle  : '添加',
            nzContent: VehicleInfoFormComponent,
            nzWidth  : '55%',
        });

        drawerRef.afterOpen.subscribe(() => {
            console.log('Drawer(Component) open');
        });

        drawerRef.afterClose.subscribe(data => {
            console.log('Drawer(Component) close');
        });
    }
}
