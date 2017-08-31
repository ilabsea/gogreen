import { Component, ViewChild, ElementRef } from '@angular/core';
import { App, PopoverController} from 'ionic-angular';
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
import { Facebook } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login';
import { PinsService } from '../../providers/pins-service';
import { NewPinActionSheetPage } from '../new-pin-action-sheet/new-pin-action-sheet';
import { ChangeOptionActionSheetPage } from '../change-option-action-sheet/change-option-action-sheet';
import { NetworkConnection } from '../../providers/network-connection';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [GoogleMaps, PinsService, NetworkConnection]
})

export class HomePage {
  marker: Marker;
  map: GoogleMap;
  currentPin: any;
  userId: any;
  markers: any;
  currentRegion: any;

  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(public popoverCtrl: PopoverController, public pinsService: PinsService,
              private storage: Storage, private facebook: Facebook, private app: App,
              private network: NetworkConnection) {
    this.markers = [];
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
        this.loadMap();
      }
    }, 100);

    this.network.onSubscribeNetwork();
  }

  logout() {
    this.facebook.logout().then((response) => {
      this.storage.set('isLogged', false);
      this.app.getRootNav().setRoot(LoginPage);
    });
  }

  ionViewDidLeave() {
    this.network.unsubscribe();
  }

  initMap(latlng) {
    let mapEle = this.mapElement.nativeElement;

    this.map = new GoogleMap(mapEle, {
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
      if (!navigator.onLine) {
        this.network.alertDisconnect();
        return;
      }

      if (window['readySubscribe']) { return; }
      window['readySubscribe'] = true;

      this.getMarkerByViewPort();
      this.onSubscribeLongClickMap();
      this.onSubscribeDragMap();
      this.map.getMyLocation((resp) => {
        this.map.setCenter(new LatLng(resp.latLng.lat, resp.latLng.lng));
      })
    });
  }

  loadMap() {
    let latlng = new LatLng(11.562108, 104.888535);
    this.initMap(latlng);
  }

  assignCurrentRegion(latlngBound) {
    let expandArea: any = 0.03;

    this.currentRegion = {
      sw_lat: latlngBound.southwest.lat - expandArea,
      sw_lng: latlngBound.southwest.lng - expandArea,
      ne_lat: latlngBound.northeast.lat + expandArea,
      ne_lng: latlngBound.northeast.lng + expandArea
    }
  }

  getMarkers() {
    if (!navigator.onLine) {
      this.network.alertDisconnect();
      return;
    }

    this.map.clear();
    this.pinsService.getAll(this.currentRegion).then((pinsResult) => {
      this.renderMarkers(pinsResult);
    });
  }

  renderMarkers(pinsResult) {
    let pins = [].concat(pinsResult);

    for(let pin of pins) {
      let option = {
        position: new LatLng (pin.latitude, pin.longitude),
        icon: { url: 'www/assets/pin/' + pin.icon + '-small.png', size: { width: 16, height: 16 } },
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
  }

  openChangeOptionsActionSheet() {
    this.map.setClickable(false);

    let popover = this.popoverCtrl.create(ChangeOptionActionSheetPage, {
      'map': this.map, 'pin': this.currentPin, 'marker': this.marker, 'userId': this.userId
    }, {cssClass: 'gogreen-action-sheets'});

    popover.present();
  }

  onSubscribeLongClickMap() {
    this.map.on(GoogleMapsEvent.MAP_LONG_CLICK).subscribe((pos) => {
      this.addMarker(pos);
    });
  }

  onSubscribeDragMap() {
    this.map.on(GoogleMapsEvent.CAMERA_CHANGE).subscribe((pos) => {
      this.getMarkerByViewPort();
    });
  }

  getMarkerByViewPort() {
    this.map.getVisibleRegion().then((latlngBound) => {
      if(!this.currentRegion) {
        this.assignCurrentRegion(latlngBound);
        this.getMarkers();
        return;
      }

      if (latlngBound.southwest.lat < this.currentRegion.sw_lat ||
          latlngBound.southwest.lng < this.currentRegion.sw_lng ||
          latlngBound.northeast.lat > this.currentRegion.ne_lat ||
          latlngBound.northeast.lng > this.currentRegion.ne_lng ) {
        this.assignCurrentRegion(latlngBound);
        this.getMarkers();
      }
    })
  }

  addMarker(pos) {
    let markerOptions: MarkerOptions = {
      position: pos,
      animation: GoogleMapsAnimation.DROP,
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
      this.showMarkerActionSheet();
    });
  }

  showMarkerActionSheet() {
    let popover = this.popoverCtrl.create(NewPinActionSheetPage, {
      'map': this.map, 'pin': this.currentPin, 'marker': this.marker, 'userId': this.userId
    }, {cssClass: 'gogreen-action-sheets disable-focus'});

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
