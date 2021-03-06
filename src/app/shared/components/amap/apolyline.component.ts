import { Component, OnInit, Input, OnDestroy, EventEmitter, Output, OnChanges } from '@angular/core';
import { MapService } from 'src/app/shared/services/map/map.service';
import { Subscription } from 'rxjs';
import { Polyline } from '../../services/map/polyline.model';

@Component({
    selector: 'app-apolyline',
    template: '<div class="polyline"></div>',
})
export class ApolylineComponent implements OnInit, OnDestroy, OnChanges {

    @Input() strokeColor: string;
    @Input() lines: number[][];
    @Output() clear = new EventEmitter<Function>();

    private _complete$: Subscription;
    private _polyine: Polyline;

    constructor(private mapService: MapService) {
    }

    ngOnInit() {
        this._complete$ = this.mapService.mapListener$.subscribe(() => {
            this.init();
        });
    }

    ngOnChanges() {
        if (this.mapService.map) {
            this.init();
        }
    }

    ngOnDestroy() {
        if (this._complete$) {
            this._complete$.unsubscribe();
        }
    }

    init() {
        this.create();
        this.clear.emit(this.hide.bind(this));
    }

    create() {
        if (this._polyine) {
            this._polyine.show();
        } else {
            const opts: Polyline = new Polyline({
                map: this.mapService.map,
                path: this.lines,
                strokeColor: this.strokeColor,
                isOutline: true,
                strokeWeight: 5,
                strokeStyle: 'solid',
                showDir: true,
            });
            this._polyine = this.mapService.createPolyline(opts);
        }
    }

    hide() {
        if (this._polyine) {
            this._polyine.hide();
        }
    }
}
