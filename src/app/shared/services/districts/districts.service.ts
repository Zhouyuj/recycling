import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/index';

import { RebirthHttp, GET, Query } from 'rebirth-http';

@Injectable({
    providedIn: 'root'
})
export class DistrictsService extends RebirthHttp {

    public counties: [ { name: string, code: number } ];

    constructor(http: HttpClient) {
        super(http);
    }

    public getCountyNames(target: [{ name: string, code: number }], code?: number) {
        if (this.counties && this.counties.length > 0) {
            target = this.counties;
        } else {
            // 查询漳州市下所有的区/县
            this.getDistricts('350600', 1).subscribe(res => {
                this.counties = res.data.districts;
                target = this.counties;
            });
        }
    }

    public initCountyNames() {
        this.getDistricts('350600', 1).subscribe(res => {
            this.counties = res.data.districts;
        });
    }

    @GET('/districts')
    getDistricts(@Query('code') code: string, @Query('subdistrict') subdistrict: number): Observable<any> {
        return null;
    }
}
