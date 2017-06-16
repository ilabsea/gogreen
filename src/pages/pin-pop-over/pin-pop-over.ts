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
  mapMarker: any;
  icon: any;

  constructor(public viewCtrl: ViewController, private navParams: NavParams,
              public pinsService: PinsService, public popoverCtrl: PopoverController,
              private storage: Storage) {
    this.mapMarker = navParams.get('mapMarker');
  }

  ionViewDidLeave(){
    this.submitPin();
  }

  submitPin(){
    let self = this;
    this.mapMarker.marker.getPosition((position) => {
      let lat = position.lat;
      let lng = position.lng;
      self.storage.get('userID').then((userId) => {
        let pinParams = {
          "pin": {
            latitude: lat,
            longitude: lng,
            icon: self.icon,
            user_id: userId,
            marker_id: self.mapMarker.marker._objectInstance.id
          }
        }
        self.pinsService.createPin(pinParams).then((pin) => {
          self.popupThanks(pin["id"]);
        }, (error) => {
          console.log('error : ', error);
        });
      });
    })
  }

  addPin(param) {
    this.icon = 'www/assets/icon/' + param + '-small.png';
    this.mapMarker.marker.setIcon(this.icon);
  }

  removeMarker(){
    this.mapMarker.marker.remove();
    this.close();
  }

  close() {
    this.viewCtrl.dismiss();
  }

  popupThanks(pinId) {
    let popover = this.popoverCtrl.create(ThanksPopOver, {
      'mapMarker' : { 'map': this.mapMarker.map, 'marker': this.mapMarker.marker, 'pinId' : pinId }
    }, {cssClass: 'thanks-popover'});
    popover.present();
  }
}
