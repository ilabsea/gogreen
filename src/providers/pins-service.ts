import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PinsService {
  public api:any = "http://192.168.1.124:3000/api/v1/";

  constructor(public http: Http) {
  }

  createPin(pinParams){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    return new Promise(resolve => {
      this.http.post(this.api + "pins", pinParams, options)
      .subscribe(data => {
        resolve(data.json());
      }, error => {
        resolve(error);
      })
    })
  }

  getPins(){
    return new Promise(resolve => {
      this.http.get(this.api + "pins")
        .subscribe(data => {
          resolve(data.json());
        }, error => {
          resolve(error);
        })
    });
  }

}
