import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Endpoint {
  public url: any = "https://856fdada.ngrok.io";
  public api:any = "https://856fdada.ngrok.io/api/v1/";
  constructor() {
  }

}
