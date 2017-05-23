import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PinPhotosService } from '../../providers/pin-photos-service';

@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html',
  providers: [PinPhotosService]

})
export class PhotoPage {
  pin: any;
  pinPhotos: any;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private pinPhotosService: PinPhotosService) {
    this.pin = navParams.get('pin');
    this.map = navParams.get('map');
  }

  ionViewDidEnter(){
    this.showPhotos();
  }

  showPhotos() {
    console.log('this.ion view didload of photo page : ', this.map);
    let pinId = this.pin["id"];
    this.map.setClickable(false);
    this.pinPhotosService.getPinPhotosByPinId(pinId).then(pinPhotos => {
      this.pinPhotos = pinPhotos["pin_photos"];
    })
  }

}
