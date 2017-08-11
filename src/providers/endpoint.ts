import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Endpoint {
  public url: any = "https://d11ce010.ngrok.io";
  public api:any = "https://d11ce010.ngrok.io/api/v1/";
  constructor() {
    
  }

}
