import { Component } from '@angular/core';
import { Platform, PopoverController} from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions,
  Marker,
  GoogleMapsAnimation,
  CameraPosition
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Facebook } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { App, ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { PinPopoverPage } from '../pin-pop-over/pin-pop-over';
import { PinsService } from '../../providers/pins-service';
import { NewPinActionSheetPage } from '../new-pin-action-sheet/new-pin-action-sheet';
import { ChangeOptionActionSheetPage } from '../change-option-action-sheet/change-option-action-sheet';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [GoogleMaps, PinsService]
})

export class HomePage {
  marker: Marker;
  map: GoogleMap;
  subscription: any;
  currentPin: any;
  userId: any;
  markers: any;

  constructor(public popoverCtrl: PopoverController,
              public pinsService: PinsService, private storage: Storage,
              public viewCtrl: ViewController, private facebook: Facebook,
              private app: App, public events: Events, private geolocation: Geolocation) {
    this.markers = [];

    // Resolve subscribe event long click map
    events.unsubscribe('tab:leave');
    events.subscribe('tab:leave', (obj) => {
      if (!!this.subscription) {
        this.subscription.unsubscribe();
      }

      if (!!this.map) {
        this.onSubscribeLongClickMap();
      }
    });
  }

  ngOnInit() {
    this.storage.get('userID').then((userId) => {
      if(!userId) {
        this.logout();
      }

      this.userId = userId;
    })
  }

  ionViewDidLoad() {
    setTimeout(() => {
      if (!this.map) {
        console.log('load Map');
        this.loadMap();
      }
    }, 500);
  }

  logout() {
    let self = this;
    this.facebook.logout().then(function(response) {
      self.storage.set('isLogged', false);
      self.app.getRootNav().setRoot(LoginPage);
    });
  }

  ionViewDidLeave() {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  clickMe() {
    this.showFeelingIconActionSheet()
  }

  initMap(latlng) {
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
        'target': latlng,
        'tilt': 30,
        'zoom': 15,
        'bearing': 50
      }
    });

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        this.geolocation.getCurrentPosition().then((resp) => {
          this.map.setCenter(new LatLng(resp.coords.latitude, resp.coords.longitude));
        }).catch((error) => {});

      this.map.setClickable(true);
      this.renderMarkers();
      this.onSubscribeLongClickMap();
    });
  }

  loadMap() {
    let latlng: LatLng;

    this.geolocation.getCurrentPosition().then((resp) => {
      latlng = new LatLng(resp.coords.latitude, resp.coords.longitude);
      this.initMap(latlng);
    }).catch((error) => {
      latlng = new LatLng(11.562108, 104.888535);
      this.initMap(latlng);
    });
  }

  renderMarkers(){
    this.map.clear();
    this.pinsService.getAll().then((pinsResult) => {
      let pins = [].concat(pinsResult);

      for(let pin of pins) {
        let option = {
          position: new LatLng (pin.latitude, pin.longitude),
          icon: { url: 'www/assets/pin/' + pin.icon + '.png', size: { width: 16, height: 16 } },
          markerClick: (marker) => {
            this.currentPin = pin;
            this.marker = this.findMarker(marker.id);
            this.openChangeOptionsActionSheet();
          }
        }

        this.map.addMarker(option).then((marker: Marker) => {
          this.markers.push(marker);
        });
      }
    });
  }

  openChangeOptionsActionSheet() {
    this.map.setClickable(false);

    let popover = this.popoverCtrl.create(ChangeOptionActionSheetPage, {
      'map': this.map, 'pin': this.currentPin, 'marker': this.marker, 'userId': this.userId
    }, {cssClass: 'gogreen-action-sheets'});

    popover.present();
  }

  onSubscribeLongClickMap() {
    this.subscription = this.map.on(GoogleMapsEvent.MAP_LONG_CLICK).subscribe((pos) => {
      this.map.setCenter(pos);
      this.addMarker(pos);
    });
  }

  addMarker(pos) {
    let markerOptions: MarkerOptions = {
      position: pos,
      animation: GoogleMapsAnimation.DROP,
      draggable: true,
      markerClick: (marker) => {
        this.map.setClickable(false);
        this.marker = this.findMarker(marker.id);
        this.currentPin = this.marker['pin'];
        this.openChangeOptionsActionSheet();
      }
    };

    this.map.addMarker(markerOptions).then((marker: Marker) => {
      this.map.setClickable(false);
      this.marker = marker;
      this.currentPin = { id: null, latitude: pos.lat, longitude: pos.lng };
      this.showFeelingIconActionSheet();
    });
  }

  showFeelingIconActionSheet() {
    let popover = this.popoverCtrl.create(NewPinActionSheetPage, {
      'map': this.map, 'pin': this.currentPin, 'marker': this.marker, 'userId': this.userId
    }, {cssClass: 'gogreen-action-sheets'});

    popover.onDidDismiss(pin => {
      if(!!pin) {
        this.marker['pin'] = pin;
        this.markers.push(this.marker);
      }
    });

    popover.present();
  }

  findMarker(id) {
    return this.markers.find(x => x['_objectInstance']['id'] === id);
  }

}
