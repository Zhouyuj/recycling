import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadReportsService {
  public static download(res: any, fileName: string = 'filename'): void {
    const objectURL = URL.createObjectURL(res);
    const link = document.createElement('a');
    document.body.append(link);
    link.download = `${fileName}.xls`;
    link.href = objectURL;
    link.click();
    document.body.removeChild(link);
  }
}
