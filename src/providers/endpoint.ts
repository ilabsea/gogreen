import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Endpoint {
  public url: any = "https://9336589c.ngrok.io";
  public api:any = "https://9336589c.ngrok.io/api/v1/";
  constructor() {
  }

}
