import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'districtCodeToName'
})
export class DistrictCodeToNamePipe implements PipeTransform {

  transform(code: number): string {

    return null;
  }

}
