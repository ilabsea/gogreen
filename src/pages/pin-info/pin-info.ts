import { Component } from '@angular/core';
import { ViewController, NavParams, NavController } from 'ionic-angular';
import { PhotoPage } from '../photo/photo';

@Component({
  selector: 'page-pin-info',
  templateUrl: 'pin-info.html',
})
export class PinInfoPage {
  mapPin: any;
  createdAt: any;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams) {
    this.mapPin = navParams.get('mapPin');
    this.createdAt = this.mapPin.pin["created_at"];
  }

  ionViewWillLeave(){
    this.mapPin.map.setClickable(true);
  }

  showPhotos() {
    this.navCtrl.push(PhotoPage, this.mapPin);
  }

  changeIcon() {

  }

}
