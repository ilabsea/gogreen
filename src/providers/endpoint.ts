import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Endpoint {
  public url: any = "https://89e0867f.ngrok.io";
  public api:any = "https://89e0867f.ngrok.io/api/v1/";
  constructor() {
  }

}
