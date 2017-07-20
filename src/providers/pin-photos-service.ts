import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { Endpoint } from './endpoint';

@Injectable()
export class PinPhotosService {
  constructor(public http: Http, private endpoint: Endpoint, private camera: Camera) {
  }

  createPinPhoto(params){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    this.http.post(this.endpoint.api + "pin_photos", params, options)
      .subscribe((response) => {
        console.log('response : ', response);
      }, (error) => {
        console.log(error);
      });
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

  getPhoto(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    return new Promise((resolve) => {
      this.camera.getPicture(options).then((imageData) => {
        resolve(imageData);
      }, (err) => {
        resolve(err);
      });
    })
  }

}
