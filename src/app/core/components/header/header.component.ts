import { Component, OnInit } from '@angular/core';

/* 第三方 */
import { MenuBar } from 'rebirth-ng';
/* 自定义 */
import { HEADER_CONFIG } from './header.component.config';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit {

    cssClass = 'header_comp';
    menus: MenuBar;
    constructor() {
    }

    ngOnInit() {
        this.menus = this.initMenus();
    }

    private initMenus() {
        return HEADER_CONFIG;
    }

}
