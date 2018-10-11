import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';

@Injectable({
    providedIn: 'root'
})
export class TitleService {

    constructor(private titleService: Title,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    /**
     * Get the title of the current HTML document.
     * @returns {string}
     */
    getTitle(): string {
        return this.titleService.getTitle();
    }

    /**
     * Set the title of the current HTML document.
     * @param newTitle
     */
    setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

    updateTitleAfterNavigated() {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(event =>  this.activatedRoute),
            map(route => {
                while (route.firstChild) {
                    route = route.firstChild;
                }
                return route;
            }),
            filter(route => route.outlet === 'primary'),
            mergeMap(route => route.data)
        ).subscribe(event => this.setTitle(event.title || '漳州餐厨收运管理系统'));

    }
}
