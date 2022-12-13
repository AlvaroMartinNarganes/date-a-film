import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform(image:any): string {
    if(image=="https://image.tmdb.org/t/p/original/null"){
      return "assets/noImage.png"
    }
    return image
  }

}
