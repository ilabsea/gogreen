import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Endpoint {
  public url: any = "https://f74a9e23.ngrok.io";
  public api:any = "https://f74a9e23.ngrok.io/api/v1/";
  constructor() {
  }

}
