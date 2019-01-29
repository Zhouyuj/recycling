import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskStateToColor'
})
export class TaskStateToColorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
