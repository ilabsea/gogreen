import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Facebook } from '@ionic-native/facebook';
import { PinPhotosService } from '../../providers/pin-photos-service';

@Component({
  selector: 'page-thanks-pop-over',
  templateUrl: 'thanks-pop-over.html',
  providers: [Camera, PinPhotosService]
})

export class ThanksPopOver {
  imageBase64: any;
  mapMarker: any;

  constructor(public viewCtrl: ViewController, public navParams: NavParams,
              private camera: Camera, private facebook: Facebook,
              private pinPhotosService: PinPhotosService) {
    this.mapMarker = navParams.get('mapMarker');
  }

  ionViewDidLeave(){
    this.mapMarker.map.setClickable(true);
  }

  shareToFacebook(){
    let self = this;

    this.mapMarker.marker.getPosition().then(function(latlng){
      let latlngUrl = latlng.toUrlValue();
      self.facebook.showDialog({
        method: "share",
        href: "https://maps.googleapis.com/maps/api/staticmap?center=" + latlngUrl
              + "&zoom=13&scale=2&size=600x300&markers=color:blue|label:S|"
              + latlngUrl,
        caption: "What should be in caption?",
        description: "Much description"
      })
    })

  }

  AddPhoto(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    let self = this;
    this.camera.getPicture(options).then((imageData) => {
      self.imageBase64 = 'data:image/jpeg;base64,' + imageData;
      let params = {
        "photo": self.imageBase64,
        "pin_id": self.mapMarker.pinId
      }
      self.pinPhotosService.createPinPhoto(params);
    }, (err) => {
      console.log('error : ', err);
    });
  }

}
