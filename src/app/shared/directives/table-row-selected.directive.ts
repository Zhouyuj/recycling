import { Directive, ElementRef, HostListener, Input } from '@angular/core';


/**
 * 该指令服务于 ant-zorro 的 table 组件
 * 提供 整行选中功能
 * TODO 实现多行选中功能
 */
@Directive({
    selector: '[appTableRowSelected]'
})
export class TableRowSelectedDirective {

    @Input() cssClass: string;
    @Input() multiple: boolean;
    @Input() isSelected: boolean;

    constructor(private el: ElementRef) {
    }

    @HostListener('mouseup', ['$event.target']) onmouseup($e) {
        if (this.isSelected) {
            this.addClass();
        } else {
            this.removeClass();
        }
    }

    removeClass() {
        this.el.nativeElement.className.replace(new RegExp(this.cssClass, 'g'), '');
    }

    addClass() {
        this.el.nativeElement.className += ` ${this.cssClass}`;
    }

}
