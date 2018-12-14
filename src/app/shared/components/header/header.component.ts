import { Component, OnInit } from '@angular/core';

/* 自定义 */
import { HEADER_CONFIG } from './header.component.config';
import {AuthorizationService} from '../../../core/services/authorization/authorization.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit {

    menus: any;
    name: string;
    constructor(private authorizationService: AuthorizationService) {
    }

    ngOnInit() {
        this.menus = this.initMenus();
        this.name = this.authorizationService.getCurrentUser().name;
    }

    private initMenus() {
        return HEADER_CONFIG;
    }

    onLogout($e) {
        this.authorizationService.logout();
    }

}
