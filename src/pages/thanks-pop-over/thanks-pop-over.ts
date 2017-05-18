import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Facebook } from '@ionic-native/facebook';

@Component({
  selector: 'page-thanks-pop-over',
  templateUrl: 'thanks-pop-over.html',
  providers: [Camera]
})

export class ThanksPopOver {
  imageBase64: any;
  mapMarker: any;

  constructor(public viewCtrl: ViewController, public navParams: NavParams,
              private camera: Camera, private facebook: Facebook) {
    this.mapMarker = navParams.get('mapMarker');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThanksPopOver');
  }

  ionViewDidLeave(){
    this.mapMarker.map.setClickable(true);
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
    this.takePicture();
  }

  close() {
    this.viewCtrl.dismiss();
    this.mapMarker.map.setClickable(true);
  }

}
