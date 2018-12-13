import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

    constructor() {
    }

    ngOnInit() {
        if (!this.options) {    // 当没有options(可选择项)传进时,默认为4级（福建省-市-县-街镇）
            /*this.districtsService.getDistricts('350600', 3).subscribe(res => {
                this.options = this.convertData(res.data.districts);
            });*/
            this.options = ZHANGZHOU_OPTIONS;
        }
    }

    public onChanges(values: any): void {
        this.changesEmitter.emit(values);
    }
}
