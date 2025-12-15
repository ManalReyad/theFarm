import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideColumn'
})
export class HideColumnPipe implements PipeTransform {

  transform(objects: any[]): any[] {
    if(objects) {
        return objects.filter(object => {
            return object.hide === false;
        });
    }

    return objects;
}

}
