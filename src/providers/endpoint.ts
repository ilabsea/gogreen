import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Endpoint {
  public url: any = "http://3ddbba1b.ngrok.io";
  public api:any = "http://3ddbba1b.ngrok.io/api/v1/";

  constructor() {
  }

}
