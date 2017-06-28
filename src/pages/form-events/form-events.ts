import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from '../../providers/events';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-form-events',
  templateUrl: 'form-events.html',
  providers: [Events, Camera]
})
export class FormEventsPage {
  event: any = {
    title: "",
    location: "",
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: "",
    description: "",
    facebook_link: "",
    image: ""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events,
              private camera: Camera) {
  }

  submitEvent(){
    this.events.createEvent(this.event);
  }

  selectImage(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    }
    let self = this;
    this.camera.getPicture(options).then((imageData) => {
      self.event.image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log('error : ', err);
    });
  }

}
