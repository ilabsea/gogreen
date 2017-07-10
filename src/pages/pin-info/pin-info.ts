import { Component } from '@angular/core';
import { ViewController, NavParams, NavController,PopoverController } from 'ionic-angular';
import { PhotoPage } from '../photo/photo';
import { PinPopoverPage } from '../pin-pop-over/pin-pop-over';

@Component({
  selector: 'page-pin-info',
  templateUrl: 'pin-info.html',
})
export class PinInfoPage {
  map: any;
  pin: any;
  marker: any;
  createdAt: any;
  numberPhoto: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public popoverCtrl: PopoverController, public viewCtrl: ViewController) {
    this.map = navParams.get('map');
    this.pin = navParams.get('pin');
    this.marker = navParams.get('marker');
    this.createdAt = this.pin["created_at"];
    this.numberPhoto = 2;
  }

  showPhotos() {
    this.navCtrl.push(PhotoPage, {'pin': this.pin, 'map': this.map});
  }

  changeIcon() {
    this.close();
    let popover = this.popoverCtrl.create(PinPopoverPage,
      {"map": this.map, "pin": this.pin, "marker": this.marker},
      {cssClass: 'pin-popover'});
    popover.present();
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
