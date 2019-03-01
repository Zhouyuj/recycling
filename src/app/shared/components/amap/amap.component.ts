import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MapService } from 'src/app/shared/services/map/map.service';
import { Map } from '../../services/map/map.model';
import { Subject } from 'rxjs';

@Component({
    selector   : 'app-amap',
    templateUrl: './amap.component.html',
    styleUrls  : [ './amap.component.scss' ]
})
export class AmapComponent implements OnInit {

    @Input() longitude: number;
    @Input() latitude: number;
    @Input() zoom: number;
    @Output() center = new EventEmitter<Function>();

    public map: Map;

    constructor(private mapService: MapService) {
    }

    ngOnInit() {
        const mapModel = new Map('amap', [this.longitude, this.latitude], this.zoom);
        this.mapService.loadMap(mapModel).subscribe(() => {
            this.center.emit(this.mapService.setCenter.bind(this.mapService));
        });
    }
}
