import { Pipe, PipeTransform } from '@angular/core';
import { DateUtil } from '../../utils/date-utils';

@Pipe({
    name: 'secondToHourMinute'
})
export class SecondToHourMinutePipe implements PipeTransform {

    transform(sec: number): string {
        const num_hour = sec / 3600;
        const h = Math.floor(num_hour);
        const m = (sec / 3600 - h) * 60;
        const result = new Date();
        result.setHours(h);
        result.setMinutes(m);
        return DateUtil.dateFormat(result, 'hh:mm');
    }

}
