import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Endpoint {
  public url: any = "https://3b79d284.ngrok.io";
  public api:any = "https://3b79d284.ngrok.io/api/v1/";

  constructor() {
  }

}
