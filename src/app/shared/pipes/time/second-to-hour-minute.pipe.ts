import { Pipe, PipeTransform } from '@angular/core';
import { DateUtil } from '../../utils/date-utils';

@Pipe({
    name: 'secondToHourMinute'
})
export class SecondToHourMinutePipe implements PipeTransform {

    transform(sec: number): string {
        let num_hour = sec / 3600;
        let h = Math.floor(num_hour);
        let m = (sec / 3600 - h) * 60;
        let result = new Date();
        result.setHours(h);
        result.setMinutes(m);
        return DateUtil.dateFormat(result, 'hh:mm');
    }

}
