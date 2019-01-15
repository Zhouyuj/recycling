import { Injectable } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    /**
     * https://ng.ant.design/components/modal/zh
     * 使用了第三方库的对话框服务
     */
    constructor(private modalService: NzModalService) {
    }

    /**
     * 删除操作提示框
     * @param options
     */
    createDeleteConfirm(options: {
        onOk:         any,   /* function */
        onCancel?:    any,   /* function */
        title?:       string,
        content?:     string,
        okText?:      string,
        okType?:      string,
        nzOkLoading?: boolean,
        cancelText?:  string,
    }) {
        return this.modalService.confirm({
            nzTitle     : options.title || '确认删除该数据 ?',
            nzContent   : options.content || '',
            nzOkText    : options.okText ||  '删除',
            nzOkType    : options.okType || 'danger',
            nzOnOk      : options.onOk,
            nzCancelText: options.cancelText || '取消',
            nzOnCancel  : options.onCancel || (() => console.log('cancel delete')),
        });
    }
}
