import { VehicleRes } from "../../base/vehicle-info/vehicle-res.model";

export class UpkeepRecordFormModel {
    id: number;
    acceptancePerson: string;
    chargePerson: string;
    planUpkeepDate: Date;
    upkeepCompany: string;
    upkeepContent: string;
    upkeepCost: number;
    upkeepMileage: number;
    upkeepPerson: string;
    upkeepDate: Date;
    upkeepTimeCost: number;
    vehicle: any;
    vehicleId: number;
}