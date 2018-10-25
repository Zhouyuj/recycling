import { Component, OnInit } from '@angular/core';

import { Marker } from './marker';
import { TestMapDemoService } from './test-map-demo.service';

@Component({
    selector   : 'app-test-map',
    templateUrl: './test-map.component.html',
    styleUrls  : [ './test-map.component.scss' ]
})
export class TestMapComponent implements OnInit {

    public map: any;

    constructor(private testMapService: TestMapDemoService) {
    }

    ngOnInit() {
        let vm = this;
        this.map = new AMap.Map('container', {
            center: [ 113.18691, 23.031716 ],
            zoom  : 15
        });

        AMap.plugin([ 'AMap.ToolBar', 'AMap.Scale', 'AMap.Autocomplete' ], () => {
            vm.map.addControl(new AMap.ToolBar());
            vm.map.addControl(new AMap.Scale());
        });

        let marker = this.testMapService.createMarker(new Marker(
            '1212',
            this.map,
            [ 113.18691, 23.031716 ]
        ));
        console.log(marker);
    }

    /** marker API start **/
    createMarker() {

    }
    /** marker API end **/

}
