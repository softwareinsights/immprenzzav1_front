import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'ciudadDataFilter'
})
export class CiudadFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.ciudad.indexOf(query) > -1);
        }
        return array;
    }
}
