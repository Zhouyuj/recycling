export class CustomerCountModel {
  public name: string;
  public address: string;
  public dateList: DateListModel[];
}

export class DateListModel {
  public date: string;
  public detailList: DetailListModel[];
  public totalQuantity: number;
  public driver: string;
  public plateNumber: string;
}

export class DetailListModel {
  public collectionTime: string;
  public driver: string;
  public plateNumber: string;
  public quantity: number;
}
