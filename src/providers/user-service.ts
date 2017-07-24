import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import { Endpoint } from './endpoint';

@Injectable()
export class UserService {
  public api:any;

  constructor(public http: Http, private endpoint: Endpoint) {}

  get(userId) {
    return new Promise(resolve => {
      this.http.get(this.endpoint.api + "pins")
        .subscribe(data => {
          // resolve(data.json());
          resolve({ 'name': 'sokly', 'user_id': '11', 'pin_count': 1, 'event_count': 3 });
        }, error => {
          resolve(error);
        })
    });
  }
}
