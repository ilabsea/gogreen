import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Endpoint {
  public url: any = "http://4548b7bb.ngrok.io";
  public api:any = "http://4548b7bb.ngrok.io/api/v1/";

  constructor() {
  }

}
