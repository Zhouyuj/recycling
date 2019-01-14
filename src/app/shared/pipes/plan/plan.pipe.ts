import { Pipe, PipeTransform } from '@angular/core';
import { TaskEnum } from '../../../manage/plan/models/task.enum';

@Pipe({
    name: 'taskStateToChinese'
})
export class TaskStateToChinesePipe implements PipeTransform {

    transform(value: string): any {
        const key = value + 'Chinese';
        return TaskEnum[key];
    }

}
