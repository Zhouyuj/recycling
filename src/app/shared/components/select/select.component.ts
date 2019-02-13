import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector   : 'app-select',
    templateUrl: './select.component.html',
    styleUrls  : [ './select.component.scss' ]
})
export class SelectComponent implements OnInit {

    @Input() title: string;
    @Input() options: any[];
    @Output() selectedEmitter: EventEmitter<any> = new EventEmitter();

    public selected_option = null;

    constructor() {
    }

    ngOnInit() {
        this.selected_option = this.title;  // 初始化时显示默认值
    }

    onSelectFilter($e) {
        const obj = {
            type: this.title,
            id: this.selected_option
        };
        this.selectedEmitter.emit(obj);
    }

}
