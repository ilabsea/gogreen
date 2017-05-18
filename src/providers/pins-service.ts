import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PinsService {

  constructor(public http: Http) {
  }

  createPin(pinParams){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    this.http.post("http://192.168.1.128:3000/api/v1/pins", pinParams, options)
      .subscribe(data => {
        console.log(data['_body']);
      }, error => {
        console.log(error);
      })
  }

  getPins(){
    return new Promise(resolve => {
      this.http.get("http://192.168.1.128:3000/api/v1/pins")
        .subscribe(data => {
          resolve(data.json());
        }, error => {
          resolve(error);
        })
    });
  }

}
