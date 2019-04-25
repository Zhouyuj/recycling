import { DateUtil } from '../../../shared/utils/date-utils';
import { UpkeepRecordFormModel } from '../model/upkeep-record-form.model';
import { UpkeepRecordReq } from '../model/upkeep-record-req.model';
import { UpkeepRecordListModel } from '../model/upkeep-record-list.model';
import { UpkeepRecordRes } from '../model/upkeep-record-res.model';
import { VehicleRes } from '../../base/vehicle-info/vehicle-res.model';

export class ModelConverter {

    public static formModelToUpkeepRecordReq (f: UpkeepRecordFormModel): UpkeepRecordReq {
        let u: UpkeepRecordReq;
        u = {
            id: f.id ? f.id: null,
            acceptancePerson: f.acceptancePerson,
            chargePerson: f.chargePerson,
            planUpkeepTime: f.planUpkeepDate.valueOf(),
            upkeepCompany: f.upkeepCompany,
            upkeepContent: f.upkeepContent,
            upkeepCost: f.upkeepCost,
            upkeepMileage: f.upkeepMileage,
            upkeepPerson: f.upkeepPerson,
            upkeepTime: f.upkeepDate.valueOf(),
            upkeepTimeCost: f.upkeepTimeCost,
            vehicleId: f.vehicle.id ? f.vehicle.id : f.vehicleId,
            plateNumber: f.vehicle.plateNumber ? f.vehicle.plateNumber : f.vehicle
        };
        return u;
    }


    public static upkeepRecordResToListModel(record: UpkeepRecordRes): UpkeepRecordListModel {
        let u: UpkeepRecordListModel;
        u = {
            id: record.id,
            acceptancePerson: record.acceptancePerson,
            chargePerson: record.chargePerson,
            planUpkeepTime: record.planUpkeepTime,
            plateNumber: record.plateNumber,
            upkeepCompany: record.upkeepCompany,
            upkeepContent: record.upkeepContent,
            upkeepCost: record.upkeepCost,
            upkeepMileage: record.upkeepMileage,
            upkeepPerson: record.upkeepPerson,
            upkeepTime: record.upkeepTime,
            upkeepTimeCost: record.upkeepTimeCost,
            checked: false
        };
        return u;
    }

    public static upkeepRecordResToFormModel(record: UpkeepRecordRes): UpkeepRecordFormModel {
        let u: UpkeepRecordFormModel;
        let vehicleOfRecord = new VehicleRes();
        u = {
            id: record.id,
            acceptancePerson: record.acceptancePerson,
            chargePerson:  record.chargePerson,
            planUpkeepDate:  record.planUpkeepTime,
            upkeepCompany:  record.upkeepCompany,
            upkeepContent:  record.upkeepContent,
            upkeepCost: record.upkeepCost,
            upkeepMileage:  record.upkeepMileage,
            upkeepPerson:  record.upkeepPerson,
            upkeepDate:  record.upkeepTime,
            upkeepTimeCost:  record.upkeepTimeCost,
            vehicle:  record.plateNumber,
            vehicleId: record.vehicleId
        };
        return u;
    }
}