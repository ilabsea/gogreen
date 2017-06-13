import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Endpoint } from './endpoint';

@Injectable()
export class PinPhotosService {

  constructor(public http: Http, private endpoint: Endpoint) {
  }

  createPinPhoto(params){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    this.http.post(this.endpoint.api + "pin_photos", params, options);
  }

  getPinPhotosByPinId(pinId) {
    return new Promise((resolve) => {
      this.http.get(this.endpoint.api + "pin_photos/" + pinId + "/get_by_pin_id")
        .subscribe(data => {
          resolve(data.json());
        }, (error) => {
          resolve(error.json());
        })
    })
  }

}
