import { Pipe, PipeTransform } from '@angular/core';
import { DateUtil } from '../../utils/date-utils';

@Pipe({
  name: 'secondToHourMinute'
})
export class SecondToHourMinutePipe implements PipeTransform {
  transform(sec: number): string {
    const num_hour = sec / 3600;
    const h = Math.floor(num_hour);
    const hour = h > 9 ? h : `0${h}`;
    const m = Math.floor((sec - h * 3600) / 60);
    const minute = m > 9 ? m : `0${m}`;
    return `${hour}:${minute}`;
  }
}
