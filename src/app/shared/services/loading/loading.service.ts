import { Injectable } from '@angular/core';
/* 第三方 */
import { OverlayService } from 'rebirth-ng';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    constructor(private overlayService: OverlayService) {
    }

    public show() {
        console.log('show loading');
        return new Promise<LoadingService>(resolve => {
            setTimeout(() => {
                this.overlayService.open({
                    //html: this.html,
                    html: `<app-loading></app-loading>`,
                });
                resolve(this);
            });
        });
    }

    public hide() {
        console.log('hide loading');
        return new Promise<LoadingService>(resolve => {
            setTimeout(() => {
                this.overlayService.close();
                resolve(this);
            });
        });
    }

    public createLoadingHtml() {
        let pixels = Array.from(Array(100)).map(item => `<div class='pixels'></div>`);
        return `
            <div class='container'>
                <div class='loaderPixel'>
                    ${pixels}
                </div>
            </div>
        `;
    }
}
