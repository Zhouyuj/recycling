import { Pipe, PipeTransform } from '@angular/core';
import { TaskEnum } from '../../../manage/plan/models/task.enum';
import { PlanCategoryEnum, PlanStateEnum } from '../../../manage/plan/models/plan.enum';

@Pipe({
    name: 'taskStateToChinese'
})
export class TaskStateToChinesePipe implements PipeTransform {

    transform(value: string): any {
        const key = value + 'Chinese';
        return TaskEnum[key];
    }

}

@Pipe({
    name: 'planStateToChinese'
})
export class PlanStateToChinesePipe implements PipeTransform {

    transform(value: string): any {
        const key = value + 'Chinese';
        return PlanStateEnum[key];
    }

}

@Pipe({
    name: 'planCategoryToChinese'
})
export class PlanCategoryToChinesePipe implements PipeTransform {

    transform(value: string): any {
        const key = value + 'Chinese';
        return PlanCategoryEnum[key];
    }

}