import { ViewController, NavParams , PopoverController} from 'ionic-angular';
import { Component } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker,
  GoogleMapsAnimation
} from '@ionic-native/google-maps';

import { ThanksPopOver } from '../thanks-pop-over/thanks-pop-over';
import { PinsService } from '../../providers/pins-service';

@Component({
  selector: 'page-pin-pop-over',
  templateUrl: 'pin-pop-over.html',
  providers: [PinsService]
})

export class PinPopoverPage {
  mapMarker: any;
  icon: any;
  imageBase64: any;

  constructor(public viewCtrl: ViewController, private navParams: NavParams,
              public pinsService: PinsService, public popoverCtrl: PopoverController) {
    this.mapMarker = navParams.get('mapMarker');
  }

  ionViewDidLeave(){
    this.mapMarker.marker.getPosition((position) => {
      let lat = position.lat;
      let lng = position.lng;
      let pinParams = {
        "pin": {
          latitude: lat,
          longitude: lng,
          icon: this.icon,
          user_id: 1,
          image: this.imageBase64
        }
      }
      this.pinsService.createPin(pinParams);
    })
    this.popupThanks();
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
    // this.mapMarker.map.setClickable(true);
  }

  popupThanks() {
    let popover = this.popoverCtrl.create(ThanksPopOver, {
      'mapMarker' : { 'map': this.mapMarker.map, 'marker': this.mapMarker.marker }
    });
    popover.present();
  }
}
