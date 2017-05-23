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
import { PinsService } from '../../providers/pins-service';
import { PinInfoPage } from '../pin-info/pin-info';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [GoogleMaps, PinsService]
})

export class HomePage {
  marker: Marker;
  map: GoogleMap;

  constructor(private googleMaps: GoogleMaps, public popoverCtrl: PopoverController,
              public platform: Platform, public pinsService: PinsService) {
    platform.ready().then(() => {
      this.loadMap();
    });
  }

  loadMap() {
    let element: HTMLElement = document.getElementById('map');

    this.map= this.googleMaps.create(element);
    let latlng: LatLng = new LatLng(11.562108, 104.888535);
    let position: CameraPosition = {
      target: latlng,
      zoom: 15,
      tilt: 30
    };

    this.map.moveCamera(position);

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.displayPins();
    });

    this.addMarker();
  }

  displayPins(){
    let self = this;
    this.pinsService.getPins().then((pinsResult) => {
      for(let pin of pinsResult["pins"]) {

        let option = {
          position: new LatLng (pin.latitude, pin.longitude),
          icon: pin.icon,
          markerClick: function(){
            console.log('pin option markerClick : ' , pin)
            this.map.setClickable(false);
            self.popupPinInfo(pin);
          }
        }
        this.map.addMarker(option);
      }
    });
  }

  addMarker(){
    let self = this;
    this.map.addEventListener(GoogleMapsEvent.MAP_CLICK).subscribe((e) => {
      this.map.setCenter(e);
      let markerOptions: MarkerOptions = {
        position: e,
        animation: GoogleMapsAnimation.DROP,
        draggable: true
      };
      this.map.addMarker(markerOptions).then((marker: Marker) => {
        console.log('marker : ', marker)
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

  popupPinInfo(pin) {
    let popover = this.popoverCtrl.create(PinInfoPage, {
      'mapPin' : { 'map': this.map, 'pin': pin }
    });
    popover.present();
  }
}
