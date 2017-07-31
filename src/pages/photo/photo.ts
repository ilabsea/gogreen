import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PinPhotosService } from '../../providers/pin-photos-service';
import { Endpoint } from '../../providers/endpoint';
import { Loading } from '../../providers/loading';

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
              public loading: Loading, private pinPhotosService: PinPhotosService,
              private endpoint: Endpoint) {
    this.pin = navParams.data.pin;
    this.map = navParams.data.map;
  }

  ionViewDidEnter(){
    this.url = this.endpoint.url;
    this.loading.show();
    this.renderPhotos();
  }

  renderPhotos() {
    this.pinPhotosService.getPinPhotosByPinId(this.pin.id).then(photos => {
      this.map.setClickable(false);
      this.pinPhotos = this.buildPhotosRowCol(photos);
      this.loading.hide();
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
        'photo': {
          'name': self.imageBase64,
          'pin_id': self.pin.id
        }
      }

      this.loading.show();
      self.pinPhotosService.createPinPhoto(params).then((imageData) => {
        self.renderPhotos();
      });
    }, (err) => {
      console.log('error : ', err);
    });
  }

}
