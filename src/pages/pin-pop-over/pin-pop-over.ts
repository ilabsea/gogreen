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
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PinsService } from '../../providers/pins-service';

@Component({
  selector: 'page-pin-pop-over',
  templateUrl: 'pin-pop-over.html',
  providers: [PinsService, Camera]
})

export class PinPopoverPage {
  mapMarker: any;
  icon: any;
  imageBase64: any;

  constructor(public viewCtrl: ViewController, private navParams: NavParams, public pinsService: PinsService , private camera: Camera) {
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
          icon: this.icon,
          user_id: 1,
          image: this.imageBase64
        }
      }
      this.pinsService.createPin(pinParams);
    })

  }

  addPin(param) {
    if(param=='camera'){
      this.takePicture();
    }else{
      this.icon = 'www/assets/icon/' + param + '-small.png';
      this.mapMarker.marker.setIcon(this.icon);
    }
  }

  takePicture(){
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.imageBase64 = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log('error : ', err);
    });
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
