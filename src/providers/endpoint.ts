import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Endpoint {
  public url: any = "https://20d53fdc.ngrok.io";
  public api:any = "https://20d53fdc.ngrok.io/api/v1/";
  constructor() {
  }

}
