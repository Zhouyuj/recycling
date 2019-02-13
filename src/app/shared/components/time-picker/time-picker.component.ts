import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { TIMES } from './time-picker-config';

@Component({
    selector   : 'app-time-picker',
    templateUrl: './time-picker.component.html',
    styleUrls  : [ './time-picker.component.scss' ]
})
export class TimePickerComponent implements OnInit, OnChanges {
    @Input() values;
    @Input() nzOptions;
    @Input() disabledTimes: Date;
    @Output() changesEmitter: EventEmitter<any> = new EventEmitter();
    constructor() {
    }

    ngOnInit() {
        if (!this.nzOptions) {
            this.nzOptions = TIMES;
        }
    }

    ngOnChanges(changes) {
        if (!this.disabledTimes) {
            return;
        }
        const hour = this.disabledTimes.getHours();
        const min = this.disabledTimes.getMinutes();
        this.nzOptions.forEach(
            (item: {
                value: string,
                label: string,
                disabled: boolean,
                children: [ { value: string, label: string, isLeaf: boolean, disabled: boolean} ],
            }) => {
                if (parseInt(item.value, 10) < hour) {
                    item.disabled = true;
                } else {
                    item.disabled = false;
                    item.children.forEach(
                        (childItem: { value: string, label: string, isLeaf: boolean, disabled: boolean}) => {
                            if (parseInt(childItem.value, 10) < min) {
                                childItem.disabled = true;
                            } else {
                                childItem.disabled = false;
                            }
                        }
                    );
                }
            }
        );
    }

    public onChanges(values: any): void {
        this.changesEmitter.emit(this.values);
    }

}
