/**
 * Created by wujiahui on 2018/10/26.
 */
export class Map {
    public id: string;
    public domId: string;
    public zoom: number;
    public center: number[];
    constructor(domId: string, center: number[], zoom: number = 13) {
        this.domId = domId;
        this.center = center;
        this.zoom = zoom;
    }
}
