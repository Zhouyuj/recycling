import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'arrayToTime'
})
export class ArrayToTimePipe implements PipeTransform {

    transform(value: number[]): string {
        return value.join(':');
    }
}
