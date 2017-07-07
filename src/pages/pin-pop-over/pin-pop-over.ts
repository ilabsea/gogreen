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

  constructor(public viewCtrl: ViewController, private navParams: NavParams,
              public pinsService: PinsService, public popoverCtrl: PopoverController,
              private storage: Storage) {
    this.map = navParams.get('map');
    this.marker = navParams.get('marker');
    this.icon = navParams.get('pin') ? navParams.get('pin').icon : '';
  }

  ionViewDidLeave(){
    this.submitPin();
  }

  submitPin(){
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
        self.pinsService.createPin(pinParams).then((pin) => {
          self.popupThanks(pin);
        }, (error) => {
          console.log('error : ', error);
        });
      });
    })
  }

  addPin(param) {
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
