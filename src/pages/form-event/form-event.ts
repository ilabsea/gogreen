import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';
import { TranslateService } from '@ngx-translate/core';

import { EventsPage } from '../events/events';

import { Loading } from '../../providers/loading';
import { EventService } from '../../providers/events';
import { NetworkConnection } from '../../providers/network-connection';

@Component({
  selector: 'page-form-event',
  templateUrl: 'form-event.html',
  providers: [EventService, Camera, Loading, NetworkConnection]
})

export class FormEventPage {
  private event;
  private minDate;
  private maxDate;
  private startTime;
  private endTime;

  constructor(public navCtrl: NavController, private events: EventService,
              private camera: Camera, public formBuilder: FormBuilder, public navParams: NavParams,
              public loading: Loading, private storage: Storage, public translate: TranslateService,
              private network: NetworkConnection, private toast: Toast) {

    var urlPattern = /^((http|https):\/\/)?((www\.)?(xn--[\w-]+)(\.?xn--[\w-]+)*|[\u00BF-\u1FFF\u2C00-\uD7FF\w]+(\-[\u00BF-\u1FFF\u2C00-\uD7FF\w]+)*(\.[\u00BF-\u1FFF\u2C00-\uD7FF\w]+(\-[\u00BF-\u1FFF\u2C00-\uD7FF\w]+)*)*)\.((xn--[\w-]+)|aero|asia|biz|cat|com|coop|eus|gal|info|int|jobs|mobi|museum|name|net|org|post|pro|tel|travel|xxx|edu|gov|mil|[\w]{2}|[\u00BF-\u1FFF\u2C00-\uD7FF]{2,10})([\/?]\S*)?$/;
    var now = new Date();
    var nextDate = new Date((now.getFullYear() + 2).toString() + '-12-31');

    this.minDate = this.formatDate(now);
    this.maxDate = this.formatDate(nextDate);
    this.event = formBuilder.group({
      'title': ['', Validators.required],
      'location': ['', Validators.required],
      'date': [this.minDate, Validators.required],
      'start_time': ['', Validators.required],
      'end_time': ['', Validators.required],
      'description': [''],
      'facebook_link': ['', Validators.compose([Validators.required, Validators.pattern(urlPattern)])],
      'image': '',
      'user_id': ''
    });
  }

  ionViewDidLeave() {
    this.network.hideToast();
  }

  formatDate(date) {
    return date.toISOString().split('T')[0];
  }

  submit(){
    if (this.event.invalid) { return; }

    if (!navigator.onLine) {
      this.network.alertDisconnect();
      return;
    }

    this.loading.show();
    this.storage.get("userID").then((userID) => {
      var data = this.event.value;
      data.user_id = userID;
      data.image = this.event.image;

      this.events.create(data).then((event) => {
        this.loading.hide();
        this.navCtrl.pop(EventsPage);
        this.navParams.get("parentPage").refreshPage();
      });
    })
  }

  validateTime() {
    if (!(this.startTime && this.endTime)) { return }

    let start = this.getMinutes(this.startTime);
    let end = this.getMinutes(this.endTime);

    if (start >= end) {
      this.alertTimeError();
      this.addTimeError();
    } else {
      this.removeTimeError();
    }
  }

  addTimeError() {
    this.event.controls['start_time'].setErrors({"compare_time": true});
    this.event.controls['end_time'].setErrors({"compare_time": true});

    document.getElementById('start-time').classList.add('item-input', 'ng-invalid', 'ng-touched');
    document.getElementById('end-time').classList.add('item-input', 'ng-invalid', 'ng-touched');
  }

  removeTimeError() {
    this.event.controls['start_time'].setErrors();
    this.event.controls['end_time'].setErrors();

    document.getElementById('start-time').classList.remove('item-input', 'ng-invalid', 'ng-touched');
    document.getElementById('end-time').classList.remove('item-input', 'ng-invalid', 'ng-touched');
  }

  alertTimeError() {
    let msg = this.translate.instant('START_TIME_EALIER_THAN_END_TIME');

    this.toast.show(msg, '2000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

  getMinutes(time) {
    let hours = parseInt(time.split(':')[0]);
    let minutes = parseInt(time.split(':')[1]);
    return (hours * 60) + minutes;
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
