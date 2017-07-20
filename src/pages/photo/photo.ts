import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PinPhotosService } from '../../providers/pin-photos-service';
import { Endpoint } from '../../providers/endpoint';

@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html',
  providers: [PinPhotosService, Endpoint]

})
export class PhotoPage {
  private pin: any;
  private pinPhotos: any;
  private map: any;
  private url: any;
  private imageBase64: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private pinPhotosService: PinPhotosService, private endpoint: Endpoint) {
    this.pin = navParams.get('pin');
    this.map = navParams.get('map');
  }

  ionViewDidEnter(){
    this.url = this.endpoint.url;
    this.showPhotos();
  }

  showPhotos() {
    let pinId = this.pin["id"];
    this.map.setClickable(false);
    this.pinPhotosService.getPinPhotosByPinId(pinId).then(pinPhotos => {
      this.pinPhotos = this.buildPhotosRowCol(pinPhotos["pin_photos"]);
    })
  }

  buildPhotosRowCol(photos) {
    let n = 0 ;
    let res = [];
    while( n < photos.length ) {
      let row = [];
      let i = n;
      while ( i < 3 + n ) {
        if(photos[i])
          row.push(photos[i]);
        i++;
      }
      res.push(row);
      n = n + 3;
    }
    return res;
  }

  addPhoto(){
    let self = this;
    this.pinPhotosService.getPhoto().then((imageData) => {
      self.imageBase64 = 'data:image/jpeg;base64,' + imageData;
      let params = {
        "photo": self.imageBase64,
        "pin_id": self.pin["id"]
      }
      self.pinPhotosService.createPinPhoto(params);
    }, (err) => {
      console.log('error : ', err);
    });
  }

}
