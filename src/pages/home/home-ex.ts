import { Component } from '@angular/core';
import { Platform, PopoverController } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker} from '@ionic-native/google-maps';
import { PinPopoverPage } from '../pin-pop-over/pin-pop-over';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: GoogleMap;
  mapDisabled: any = false;

  constructor(public platform: Platform, public popoverCtrl: PopoverController) {
    platform.ready().then(() => {
      this.loadMap();
    });
  }

  loadMap() {
    let location = new LatLng(-34.9290,138.6010);

    this.map = new GoogleMap('map', {
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
        'latLng': location,
        'tilt': 30,
        'zoom': 15,
        'bearing': 50
      }
    });

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready!');
    });

    let icons: any = {
      happy: {
        icon: 'happy.png'
      },
      sad: {
        icon: 'sad.png'
      },
      trash: {
        icon: 'trash.png'
      }
    }

    this.map.addEventListener(GoogleMapsEvent.MAP_CLICK).subscribe((e) => {
      if(!this.mapDisabled){
        console.log('e : ', e)
        let markerOptions: MarkerOptions = {
          position: e,
          title: "content",
          animation: "DROP",
          draggable: true,
          icon: 'assets/icon/' + icons.happy
        };
        console.log("markerOptions : ", markerOptions );
        this.map.addMarker(markerOptions).then((marker: Marker) => {
          marker.showInfoWindow()
        });
      }
    });
  }

  popupPinIcon() {
    let popover = this.popoverCtrl.create(PinPopoverPage);
    console.log('popover : ', popover);
    popover.present();
  }

}
