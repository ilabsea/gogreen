import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Endpoint } from './endpoint';

@Injectable()
export class Events {

  constructor(public http: Http, private endpoint: Endpoint) {
    console.log('Hello Events Provider');
  }

  create(params) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    return new Promise(resolve => {
      this.http.post(this.endpoint.api + "events", params, options)
      .subscribe(data => {
        resolve(data.json());
      }, error => {
        resolve(error);
      })
    })
  }

  getAll(pageNum) {
    return new Promise(resolve => {
      this.http.get(this.endpoint.api + "events?page=" + pageNum)
        .subscribe(data => {
          resolve(data.json());
        }, error => {
          resolve(error);
        })
    });
  }
}
