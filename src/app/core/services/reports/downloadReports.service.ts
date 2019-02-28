import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadReportsService {
  download(res): any {
    var objectURL = URL.createObjectURL(res);
    var link = document.createElement('a');
    document.body.append(link);
    link.download = `${new Date()}.xls`;
    link.href = objectURL;
    link.click();
    document.body.removeChild(link);
  }
}
