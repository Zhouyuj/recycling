import { Injectable } from '@angular/core';

import { NzNotificationService } from 'ng-zorro-antd';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    /**
     * https://ng.ant.design/components/notification/zh
     * 使用了第三方库的全局通知提醒服务
     */
    constructor(private nzNotificationService: NzNotificationService) {
    }

    /**
     * 在页面中上部创建 notification 提示框
     * @param type
     * @param content
     * @param options
     * @returns {string}
     */
    public create(opts: {
        type: 'blank' | 'success' | 'error' | 'info' | 'warning' | 'loading',
        title: string,
        content: string,
        options?: NotificationOptions
    }): string {

        const id = this.nzNotificationService[ opts.type ](opts.title, opts.content, opts.options).messageId;
        return id;
    }

    /**
     * 移除 notification 提示框
     * 其中 id 为空时,移除全部
     * @param id
     */
    public remove(id): void {
        this.nzNotificationService.remove(id || null);
    }

}

/**
 * options 类型
 */
class NotificationOptions {
    constructor(public nzDuration?: number,    // 持续时间(毫秒)，当设置为0时不消失, 默认4500
                public nzPauseOnHover?: boolean,   // 鼠标移上时禁止自动移除
                public nzAnimate?: boolean,  // 开关动画效果
                public nzStyle?: {},   // 自定义内联样式
                public nzClass?: {}    // 自定义 CSS class
    ) {
    }
}
