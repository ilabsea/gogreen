import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PinPhotosService } from '../../providers/pin-photos-service';
import { Endpoint } from '../../providers/endpoint';
import { Loading } from '../../providers/loading';
import { Toast } from '@ionic-native/toast';
import { TranslateService } from '@ngx-translate/core';

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
              private endpoint: Endpoint, private toast: Toast,
              public translate: TranslateService) {
    this.pin = navParams.data.pin;
    this.map = navParams.data.map;
    this.userId = navParams.data.userId;
  }

  ionViewDidEnter() {
    if (!navigator.onLine) {
      this.alertDisconnect();
      return;
    }

    this.url = this.endpoint.url;
    this.photos =[];
    this.loading.show();
    this.renderPhotos();
    this.map.setClickable(false);
  }

  alertDisconnect() {
    let msg = this.translate.instant('CANNOT_CONNECT_RIGHT_NOW');
    this.toast.show(msg, '10000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

  ionViewDidLeave() {
    this.map.setClickable(true);
  }

  goBack() {
    this.navCtrl.pop();
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

  addPhoto() {
    if (!navigator.onLine) {
      this.alertDisconnect();
      return;
    }

    this.pinPhotosService.getPhoto().then((imageData) => {
      if(imageData != 'Camera cancelled.'){
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
      }
    }, (err) => {
      console.log('error : ', err);
    });
  }

}
