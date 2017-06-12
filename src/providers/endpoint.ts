import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Endpoint {
  public url: any = "http://9866a230.ngrok.io";
  public api:any = "http://9866a230.ngrok.io/api/v1/";

  constructor() {
  }

}
