import { ViewController, NavParams } from 'ionic-angular';
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
import { PinsService } from '../../providers/pins-service';

@Component({
  selector: 'page-pin-pop-over',
  templateUrl: 'pin-pop-over.html',
  providers: [PinsService]
})

export class PinPopoverPage {
  mapMarker: any;
  icon: any;

  constructor(public viewCtrl: ViewController, private navParams: NavParams, public pinsService: PinsService ) {
    this.mapMarker = navParams.get('mapMarker');
  }

  ionViewDidLeave(){
    this.mapMarker.map.setClickable(true);
    this.mapMarker.marker.getPosition((position) => {
      let lat = position.lat;
      let lng = position.lng;
      let pinParams = {
        "pin": {
          latitude: lat,
          longitude: lng,
          image_url: this.icon,
          user_id: 1
        }
      }
      this.pinsService.createPin(pinParams);
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
    this.mapMarker.map.setClickable(true);
  }
}
