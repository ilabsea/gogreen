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

@Component({
  selector: 'page-pin-pop-over',
  templateUrl: 'pin-pop-over.html'
})

export class PinPopoverPage {
  mapMarker: any;

  constructor(public viewCtrl: ViewController, private navParams: NavParams) {
    this.mapMarker = navParams.get('mapMarker');
  }

  addPin(param){
    this.mapMarker.marker.setIcon('www/assets/icon/' + param + '.png');
    console.log('param : ', this.mapMarker);

  }

  removeMarker(){
    console.log('this.mapMarker.marker : ', this.mapMarker.marker);
    this.mapMarker.marker.remove();
    this.close();
  }

  close() {
    this.viewCtrl.dismiss();
    this.mapMarker.map.setClickable(true);
  }


}
