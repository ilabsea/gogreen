import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Endpoint {
  public url: any = "https://530b340e.ngrok.io";
  public api:any = "https://530b340e.ngrok.io/api/v1/";
  constructor() {
  }

}
