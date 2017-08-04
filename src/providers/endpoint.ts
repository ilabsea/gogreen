import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Endpoint {
  public url: any = "https://623e49fd.ngrok.io";
  public api:any = "https://623e49fd.ngrok.io/api/v1/";
  // public url: any = "http://192.168.1.127";
  // public api:any = "http://192.168.1.127/api/v1/";
  constructor() {
  }

}
