import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { Events } from '../../providers/events';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EventPage } from '../event/event';
import { Loading } from '../../providers/loading';

@Component({
  selector: 'page-form-events',
  templateUrl: 'form-events.html',
  providers: [Events, Camera, Loading]
})

export class FormEventsPage {
  private event = {
    'title': '',
    'location': '',
    'date': '',
    'start_time': '',
    'end_time': '',
    'description': '',
    'facebook_link': '',
    'image': ''
  };

  constructor(public navCtrl: NavController, private events: Events,
              private camera: Camera, public formBuilder: FormBuilder,
              public loading: Loading) {
    // this.event = formBuilder.group({
    //   'title': ['', Validators.required],
    //   'location': ['', Validators.required],
    //   'start_date': [''],
    //   'start_time': [''],
    //   'end_date': [''],
    //   'end_time': [''],
    //   'description': [""],
    //   'facebook_link': [""],
    //   'image': ['']
    // });
  }

  submit(){
    console.log('this.event : ', this.event);
    this.loading.show();
    let self = this;
    this.events.create(this.event).then(() => {
      this.loading.hide();
      self.navCtrl.pop(EventPage);
    });
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
