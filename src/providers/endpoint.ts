import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Endpoint {
  public url: any = "http://0b9f6964.ngrok.io";
  public api:any = "http://0b9f6964.ngrok.io/api/v1/";

  constructor() {
  }

}
