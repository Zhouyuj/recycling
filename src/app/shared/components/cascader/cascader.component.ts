import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DistrictsService } from '../../services/districts/districts.service';

import { ZHANGZHOU_OPTIONS } from './cascader-zhangzhou.config';

@Component({
    selector   : 'app-cascader',
    templateUrl: './cascader.component.html',
    styleUrls  : [ './cascader.component.scss' ]
})
export class CascaderComponent implements OnInit {

    @Input() options: any[];

    @Input() values: any[];
    @Output() changesEmitter: EventEmitter<any> = new EventEmitter();

    constructor(private districtsService: DistrictsService) {
    }

    ngOnInit() {
        if (!this.options) {    // 当没有options(可选择项)传进时,默认为3级（福建省-市-县）
            /*this.districtsService.getDistricts('350600', 3).subscribe(res => {
                this.options = this.convertData(res.data.districts);
            });*/
            this.options = ZHANGZHOU_OPTIONS;
        }
    }

    public onChanges(values: any): void {
        this.changesEmitter.emit(values);
    }

    /**
     * 转换接口的地区数据为页面展示数据
     * 350000-福建省, 350600-漳州市, 350603-龙文区
     * 目前接口查找到 （龙文区级别),福建省与漳州市给默认值.
     */
    private convertData(districts: any[]): any[] {
        let leafDistricts = districts.map(district => {
            return {
                value : district.code,
                label : district.name,
                isLeaf: true,
            }
        });
        let result = [ {
            value   : '350000',
            label   : '福建省',
            children: [
                {
                    value   : '350600',
                    label   : '漳州市',
                    children: [ ...leafDistricts ],
                }
            ],
        } ];
        return result;
    }
}
