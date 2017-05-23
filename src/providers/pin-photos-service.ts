import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { PinsService } from './pins-service';

@Injectable()
export class PinPhotosService {

  constructor(public http: Http, private pinsService: PinsService) {
  }

  createPinPhoto(params){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    console.log('params : ', params);

    this.http.post(this.pinsService.api + "pin_photos", params, options)
      .subscribe(data => {
        console.log(data['_body']);
      }, error => {
        console.log(error);
      })
  }

  getPinPhotosByPinId(pinId) {
    return new Promise((resolve) => {
      this.http.get(this.pinsService.api + "pin_photos/" + pinId + "/get_by_pin_id")
        .subscribe(data => {
          resolve(data.json());
        }, (error) => {
          resolve(error.json());
        })
    })
  }

}
