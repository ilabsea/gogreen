import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Camera {

  constructor() {
    console.log('Hello Camera Provider');
  }

}
