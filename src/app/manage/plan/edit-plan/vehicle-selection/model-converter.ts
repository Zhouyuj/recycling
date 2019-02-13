/**
 * Created by wujiahui on 2018/12/21.
 */

import { VehicleRes } from '../../../base/vehicle-info/vehicle-res.model';
import { VehicleSelectionModel } from './vehicle-selection.model';

export class ModelConverter {

    public static vehicleResToListModel(r: VehicleRes): VehicleSelectionModel {
        let v: VehicleSelectionModel;
        v = {
            id         : r.id,
            plateNumber: r.plateNumber,
            // district   : r.area,
            vehicleType: r.businessLine ? r.businessLine.type.name : '',
            checked    : false,
        };
        return v;
    }
}
