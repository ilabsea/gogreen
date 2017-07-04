import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Endpoint {
  public url: any = "https://dfc7f25a.ngrok.io";
  public api:any = "https://dfc7f25a.ngrok.io/api/v1/";
  constructor() {
  }

}
