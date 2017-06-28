import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Endpoint } from './endpoint';

@Injectable()
export class PinsService {
  public api:any;

  constructor(public http: Http, private endpoint: Endpoint) {
  }

  createPin(pinParams){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    return new Promise(resolve => {
      this.http.post(this.endpoint.api + "pins", pinParams, options)
      .subscribe(data => {
        resolve(data.json());
      }, error => {
        resolve(error);
      })
    })
  }

  getPins(){
    return new Promise(resolve => {
      this.http.get(this.endpoint.api + "pins")
        .subscribe(data => {
          resolve(data.json());
        }, error => {
          resolve(error);
        })
    });
  }

  getPinByMarkerId(markerId){
    return new Promise(resolve => {
      this.http.get(this.endpoint.api + "pins/" + markerId + "/get_by_marker_id")
        .subscribe(data => {
          resolve(data.json());
        }, error => {
          resolve(error);
        })
    });
  }

  getNumberPinsByUserId(userId){
    return new Promise(resolve => {
      this.http.get(this.endpoint.api + "pins/" + userId + "count_by_user")
        .subscribe(data => {
          resolve(data.json());
        }, error => {
          resolve(error);
        })
    })
  }

}
