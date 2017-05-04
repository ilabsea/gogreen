import { Component } from '@angular/core';
import { Platform, PopoverController} from 'ionic-angular';
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
import { PinPopoverPage } from '../pin-pop-over/pin-pop-over';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [GoogleMaps]
})

export class HomePage {
  marker: Marker;
  map: GoogleMap;

  constructor(private googleMaps: GoogleMaps, public popoverCtrl: PopoverController, public platform: Platform,) {
    platform.ready().then(() => {
      this.loadMap();
    });
  }

  loadMap() {
    let element: HTMLElement = document.getElementById('map');

    this.map= this.googleMaps.create(element);
    let ionic: LatLng = new LatLng(10,105);
    let position: CameraPosition = {
      target: ionic,
      zoom: 15,
      tilt: 30
    };

    this.map.moveCamera(position);

    this.map.one(GoogleMapsEvent.MAP_READY).then(() =>
      console.log('Map is ready!')
    );

    this.addMarker();

  }

  addMarker(){
    this.map.addEventListener(GoogleMapsEvent.MAP_CLICK).subscribe((e) => {
      this.map.setCenter(e);
      let markerOptions: MarkerOptions = {
        position: e,
        animation: GoogleMapsAnimation.DROP,
        draggable: true
      };
      this.map.addMarker(markerOptions).then((marker: Marker) => {
        this.marker = marker;
        this.map.setClickable(false);
        this.popupPinIcon();
      });
    });
  }

  popupPinIcon() {
    let popover = this.popoverCtrl.create(PinPopoverPage, {
      'mapMarker' : { 'map': this.map, 'marker': this.marker }
    });
    popover.present();
  }
}
