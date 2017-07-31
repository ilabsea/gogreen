import { ViewController, NavParams , PopoverController} from 'ionic-angular';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ThanksPopOver } from '../thanks-pop-over/thanks-pop-over';
import { PinsService } from '../../providers/pins-service';
import { PinInfoPage } from '../pin-info/pin-info';
import {
  GoogleMapsEvent
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-pin-pop-over',
  templateUrl: 'pin-pop-over.html',
  providers: [PinsService]
})

export class PinPopoverPage {
  map: any;
  marker: any;
  icon = '';
  pin: any;


  constructor(public viewCtrl: ViewController, private navParams: NavParams,
              public pinsService: PinsService, public popoverCtrl: PopoverController,
              private storage: Storage) {
    this.map = navParams.get('map');
    this.marker = navParams.get('marker');
    this.pin = navParams.get('pin');
    this.icon = this.pin ? this.pin.icon : '';
  }

  ionViewDidEnter(){
    this.map.setClickable(false);
  }

  ionViewDidLeave(){
    console.log('this.pin : ', this.pin);
    if(this.pin)
      this.update(this.pin['id']);
    else
      this.create();

    this.map.setClickable(true);
  }

  create(){
    let self = this;
    this.marker.getPosition((position) => {
      let lat = position.lat;
      let lng = position.lng;
      self.storage.get('userID').then((userId) => {
        let pinParams = {
          "pin": {
            latitude: lat,
            longitude: lng,
            icon: self.icon,
            user_id: userId,
            marker_id: self.marker._objectInstance.id
          }
        }
        self.pinsService.create(pinParams).then((pin) => {
          self.popupThanks(pin);
        }, (error) => {
          console.log('error : ', error);
        });
      });
    })
  }

  update(pinId) {
    console.log('this.icon update : ', this.icon);
    let self = this;
    console.log('thismap : ', this.map)
    this.pinsService.update(pinId, {"icon": this.icon}).then(() => {
      self.map.setClickable(true);
    });
  }

  setIcon(param) {
    this.icon =  param;
    this.marker.setIcon('www/assets/pin/' + this.icon + '-small.png');
  }

  removeMarker(){
    this.marker.remove();
    this.close();
  }

  close() {
    this.viewCtrl.dismiss();
  }

  popupThanks(pin) {
    let popover = this.popoverCtrl.create(ThanksPopOver, {
      'map': this.map, 'marker': this.marker, 'pin' : pin
    }, {cssClass: 'thanks-popover'});
    popover.present();
  }
}
