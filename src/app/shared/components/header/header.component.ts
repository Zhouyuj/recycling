import { Component, OnInit } from '@angular/core';

/* 自定义 */
import { HEADER_CONFIG } from './header.component.config';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit {

    menus: any;
    constructor() {
    }

    ngOnInit() {
        this.menus = this.initMenus();
    }

    private initMenus() {
        return HEADER_CONFIG;
    }

}
