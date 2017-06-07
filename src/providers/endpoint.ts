import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Endpoint {
  public url: any = "http://192.168.1.124:3000";
  public api:any = "http://192.168.1.124:3000/api/v1/";

  constructor() {
  }

}
