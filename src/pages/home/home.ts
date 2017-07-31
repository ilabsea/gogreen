import { Component } from '@angular/core';
import { Platform, PopoverController} from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
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
              public pinsService: PinsService) {
    this.map = null;
    this.marker = null;
  }

  ionViewDidLoad(){
    setTimeout(() => {
      if (!this.map) {
        console.log('load Map');
        this.loadMap();
        this.createMarker();
      }
    }, 500);
  }

  loadMap() {
    let latlng: LatLng = new LatLng(11.562108, 104.888535);
    this.googleMaps

    this.map = new GoogleMap('map_canvas', {
      'backgroundColor': 'white',
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': true,
        'zoom': true
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
      'camera': {
        'latLng': latlng,
        'tilt': 30,
        'zoom': 15,
        'bearing': 50
      }
    });

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.displayPins();
    });

  }

  displayPins(){
    let self = this;
    this.map.clear();

    this.pinsService.getAll().then((pinsResult) => {
      for(let pin of pinsResult["pins"]) {
        let option = {
          position: new LatLng (pin.latitude, pin.longitude),
          icon: 'www/assets/pin/' + pin.icon + '-small.png',
          markerClick: function(marker) {
            console.log('e : ', marker);
            self.map.setClickable(false);
            self.popupPinInfo(pin, marker);
          }
        }
        this.map.addMarker(option);
      }
    });
  }

  createMarker(){
    this.map.on(GoogleMapsEvent.MAP_LONG_CLICK).subscribe((e) => {
      this.map.setCenter(e);
      let self = this;
      let markerOptions: MarkerOptions = {
        position: e,
        animation: GoogleMapsAnimation.DROP,
        draggable: true,
        markerClick: function(marker){
          self.map.setClickable(false);
          self.pinsService.get(marker.id).then((pin) => {
            self.popupPinInfo(pin, marker);
          }, (error) => {
            console.log('error : ', error)
          });

        }
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
      'map': this.map, 'marker': this.marker
    }, {cssClass: 'pin-popover'});
    popover.present();
  }

  popupPinInfo(pin, marker) {
    let popover = this.popoverCtrl.create(PinInfoPage, {
      'map': this.map, 'pin': pin , 'marker': marker
    }, {cssClass: 'pin-info-popover'});
    popover.present();
  }
}
