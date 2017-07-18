import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Endpoint {
  public url: any = "https://a1eb77b8.ngrok.io";
  public api:any = "https://a1eb77b8.ngrok.io/api/v1/";
  constructor() {
  }

}
