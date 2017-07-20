import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Endpoint {
  public url: any = "https://4e8f8be0.ngrok.io";
  public api:any = "https://4e8f8be0.ngrok.io/api/v1/";
  constructor() {
  }

}
