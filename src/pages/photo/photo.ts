import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PinPhotosService } from '../../providers/pin-photos-service';
import { Endpoint } from '../../providers/endpoint';
import { Loading } from '../../providers/loading';
import { NetworkConnection } from '../../providers/network-connection';
import { PopoverController } from 'ionic-angular';
import { ReasonPage } from '../reason/reason';

@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html',
  providers: [PinPhotosService, Endpoint, NetworkConnection]

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
              private endpoint: Endpoint, private network: NetworkConnection,
              public popoverCtrl: PopoverController) {
    this.pin = navParams.data.pin;
    this.map = navParams.data.map;
    this.userId = navParams.data.userId;
  }

  presentReasonPopover(photo) {
    if (!photo.is_rejected) { return; }

    window['donLeavePhoto'] = true;
    let popover = this.popoverCtrl.create(ReasonPage, { reason: photo.reason });
    popover.onDidDismiss(obj => {
      window['donLeavePhoto'] = false;
    });

    popover.present();
  }

  ionViewDidEnter() {
    if (!navigator.onLine) {
      this.network.alertDisconnect();
      return;
    }

    if (window['donLeavePhoto']) { return; }

    this.url = this.endpoint.url;
    this.photos =[];
    this.loading.show();
    this.renderPhotos();
    this.map.setClickable(false);
  }

  ionViewDidLeave() {
    if (window['donLeavePhoto']) { return; }

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
      this.network.alertDisconnect();
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
