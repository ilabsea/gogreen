import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';

import { EventsPage } from '../events/events';

import { Loading } from '../../providers/loading';
import { Events } from '../../providers/events';

@Component({
  selector: 'page-form-event',
  templateUrl: 'form-event.html',
  providers: [Events, Camera, Loading]
})

export class FormEventPage {
  private event;

  constructor(public navCtrl: NavController, private events: Events,
              private camera: Camera, public formBuilder: FormBuilder,
              public loading: Loading, private storage: Storage) {

    var urlPattern = /^((http|https):\/\/)?((www\.)?(xn--[\w-]+)(\.?xn--[\w-]+)*|[\u00BF-\u1FFF\u2C00-\uD7FF\w]+(\-[\u00BF-\u1FFF\u2C00-\uD7FF\w]+)*(\.[\u00BF-\u1FFF\u2C00-\uD7FF\w]+(\-[\u00BF-\u1FFF\u2C00-\uD7FF\w]+)*)*)\.((xn--[\w-]+)|aero|asia|biz|cat|com|coop|eus|gal|info|int|jobs|mobi|museum|name|net|org|post|pro|tel|travel|xxx|edu|gov|mil|[\w]{2}|[\u00BF-\u1FFF\u2C00-\uD7FF]{2,10})([\/?]\S*)?$/;

    this.event = formBuilder.group({
      'title': ['', Validators.required],
      'location': ['', Validators.required],
      'date': ['', Validators.required],
      'start_time': ['', Validators.required],
      'end_time': ['', Validators.required],
      'description': [''],
      'facebook_link': ['', Validators.compose([Validators.required, Validators.pattern(urlPattern)])],
      'image': '',
      'user_id': ""
    });
  }

  submit(){
    if (this.event.invalid) { return; }

    let self = this;
    this.loading.show();
    this.storage.get("userID").then((userID) => {
      self.event["user_id"] = userID;

      this.events.create(self.event.value).then(() => {
        self.loading.hide();
        self.navCtrl.pop(EventsPage);
      });
    })
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
