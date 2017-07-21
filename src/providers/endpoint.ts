import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Endpoint {
  public url: any = "https://b0af9c6b.ngrok.io";
  public api:any = "https://b0af9c6b.ngrok.io/api/v1/";
  constructor() {
  }

}
