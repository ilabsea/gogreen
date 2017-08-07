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
  pin: any;
  photos: any;
  map: any;
  url: any;
  imageBase64: any;
  userId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loading: Loading, private pinPhotosService: PinPhotosService,
              private endpoint: Endpoint) {
    this.pin = navParams.data.pin;
    this.map = navParams.data.map;
    this.userId = navParams.data.userId;

    // this.pin = { id: 1 };
    // this.userId = 1;
  }

  ionViewDidEnter(){
    this.url = this.endpoint.url;
    this.photos =[];
    this.loading.show();
    this.renderPhotos();
    this.map.setClickable(false);
  }

  ionViewDidLeave() {
    this.map.setClickable(true);
  }

  renderPhotos() {
    this.pinPhotosService.getPhotosByPinId(this.pin.id).then(photos => {
      this.photos = this.formatData(photos);
      this.loading.hide();
    })
  }

  formatData(photos) {
    for (let i=0; i<photos.length; i++) {
      photos[i]['is_mine'] = (photos[i].user_id == this.userId);
    }

    return photos;
  }

  addPhoto(){
    this.pinPhotosService.getPhoto().then((imageData) => {
      this.imageBase64 = 'data:image/jpeg;base64,' + imageData;
      let params = {
        'photo': {
          'name': this.imageBase64,
          'pin_id': this.pin.id,
          'user_id': this.userId
        }
      }

      this.loading.show();
      this.pinPhotosService.create(params).then((imageData) => {
        this.renderPhotos();
      });
    }, (err) => {
      console.log('error : ', err);
    });
  }

}
