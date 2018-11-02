import { Injectable } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    /**
     * https://ng.ant.design/components/message/zh
     * 使用了第三方库的全局提示服务
     */
    constructor(private message: NzMessageService) {
    }

    /**
     * 在页面中上部创建 message 信息框
     * @param type
     * @param content
     * @param options
     * @returns {string}
     */
    public create(opts: {
        type: 'success' | 'error' | 'info' | 'warning' | 'loading',
        content: string,
        options?: MessageOptions
    }): string {

        const id = this.message[ opts.type ](opts.content, opts.options).messageId;
        return id;
    }

    /**
     * 移除 message 信息框
     * 其中 id 为空时,移除全部
     * @param id
     */
    public remove(id): void {
        this.message.remove(id || null);
    }
}

/**
 * options 类型
 */
class MessageOptions {
    constructor(public nzDuration?: number,    // 持续时间(毫秒)，当设置为0时不消失, 默认3000
                public nzPauseOnHover?: boolean,   // 鼠标移上时禁止自动移除
                public nzAnimate?: boolean) {  // 开关动画效果
    }
}