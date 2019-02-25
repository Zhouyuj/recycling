import { OnInit, Component } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { MapService } from 'src/app/shared/services/map/map.service';
import { Map } from 'src/app/shared/services/map/map.model';

@Component({
    selector: 'app-history-scheme-route-detail',
    templateUrl: './scheme-route-detail.component.html',
    styleUrls: [ './scheme-route-detail.component.scss' ]
})
export class SchemeRouteDetailComponent implements OnInit {

    percent = 0;
    isPlay = false;
    interval$;

    constructor(private mapService: MapService) {

    }

    ngOnInit() {
        this.initMap();
    }

    initMap() {
        const subject = new Subject();
        const subscription = this.mapService.initMap().subscribe((hasLoaded: boolean) => {
            if (hasLoaded) {
                this.mapService.createMap(new Map('map', [ 113.18691, 23.031716 ], 15));
                if (subscription) {
                    subscription.unsubscribe(); // 取消定时器
                    subject.next(true);
                }
            }
        });
        return subject;
    }

    onTest() {
        if (this.isPlay) {
            this.interval$.unsubscribe();
        } else {
            this.interval$ = interval(1000).subscribe(() => this.percent += 1);
        }
        this.isPlay = !this.isPlay;
    }
}
