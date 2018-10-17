import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ZHANGZHOU_OPTIONS } from './cascader-zhangzhou.config';

@Component({
    selector   : 'app-cascader',
    templateUrl: './cascader.component.html',
    styleUrls  : [ './cascader.component.scss' ]
})
export class CascaderComponent implements OnInit {

    @Input() options: any[];
    public nzOptions: any[];
    public values: any[] = null;
    @Output() changesEmitter: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
        this.nzOptions = this.options || ZHANGZHOU_OPTIONS;
    }

    public onChanges(values: any): void {
        this.changesEmitter.emit(values);
    }

    /**
     * 转换接口的地区数据为页面展示数据
     */
    private convertData(): void {}
}
