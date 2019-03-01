import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadReportsService {
  download(res, fileName): any {
    var objectURL = URL.createObjectURL(res);
    var link = document.createElement('a');
    document.body.append(link);
    link.download = `${fileName}.xls`;
    link.href = objectURL;
    link.click();
    document.body.removeChild(link);
  }
}
