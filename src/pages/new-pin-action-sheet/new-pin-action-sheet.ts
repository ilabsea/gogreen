import { ViewController, NavParams , PopoverController} from 'ionic-angular';
import { Component } from '@angular/core';
import { PinsService } from '../../providers/pins-service';
import { ActionSheetController } from 'ionic-angular';
import { PinPhotosService } from '../../providers/pin-photos-service';
import { Facebook } from '@ionic-native/facebook';
import { Loading } from '../../providers/loading';
import { ThanksPopOver } from '../thanks-pop-over/thanks-pop-over';

@Component({
  selector: 'page-new-pin-action-sheet',
  template: '',
  providers: [PinsService, PinPhotosService]
})

export class NewPinActionSheetPage {
  map: any;
  marker: any;
  pin: any;
  userId: any;
  imageBase64: any;

  constructor(public viewCtrl: ViewController, private navParams: NavParams,
              public pinsService: PinsService, public popoverCtrl: PopoverController,
              public actionSheetCtrl: ActionSheetController, private facebook: Facebook,
              private pinPhotosService: PinPhotosService, private loading: Loading) {
    this.map = navParams.data.map;
    this.marker = navParams.data.marker;
    this.pin = navParams.data.pin;
    this.userId = navParams.data.userId;
  }

  ngOnInit() {
    this.showFeelingIconActionSheet();
  }

  ionViewDidLoad() {
    this.map.setClickable(false);
  }

  showFeelingIconActionSheet() {
    let title = this.pin.id ? 'Change your pin' : 'Place your pin';
    let actionSheet = this.actionSheetCtrl.create({
      title: title,
      cssClass: 'pin-buttons my-action-sheets',
      buttons: [
        {
          cssClass: 'happy',
          handler: () => {
            console.log('happy');
            this.upsertPin('happy');
          }
        },{
          cssClass: 'sad',
          handler: () => {
            console.log('sad');
            this.upsertPin('sad');
          }
        },{
          cssClass: 'trash',
          handler: () => {
            console.log('trash');
            this.upsertPin('trash');
          }
        },{
          cssClass: 'cancel',
          role: 'cancel',
          handler: () => {
            console.log('cancel pin');

            this.map.setClickable(true);
            this.viewCtrl.dismiss();
            if (!this.pin.id) {
              this.marker.remove();
            }
          }
        }
      ]
    });

    actionSheet.present();
  }

  upsertPin(icon) {
    if(!!this.pin.id) {
      this.update(icon);
    } else {
      this.create(icon);
    }
  }

  update(icon) {
    console.log('update');
    this.pinsService.update(this.pin.id, {"icon": icon}).then(() => {
      this.marker.setIcon('www/assets/pin/' + icon + '-small.png');
      this.map.setClickable(true);
      this.viewCtrl.dismiss();
    });
  }

  create(icon) {
    console.log('create');
    let pinParams = {
      "pin": {
        latitude: this.pin.latitude,
        longitude: this.pin.longitude,
        icon: icon,
        user_id: this.userId,
        marker_id: this.marker['_objectInstance']['id']
      }
    }

    this.pinsService.create(pinParams).then((pin) => {
      this.marker.setIcon('www/assets/pin/' + icon + '-small.png');
      this.pin = pin;
      this.viewCtrl.dismiss(pin);
      this.showAddPhotoAndShareActionSheet();
    }, (error) => {
      console.log('error : ', error);
    });
  }

  showAddPhotoAndShareActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      cssClass: 'my-action-sheets',
      buttons: [
        {
          text: 'Add Photos',
          cssClass: 'add-photo',
          icon: 'camera',
          handler: () => {
            console.log('add photo');
            this.addPhoto();
          }
        },{
          text: 'Share to your friend',
          cssClass: 'share',
          icon: 'share',
          handler: () => {
            console.log('share to fb');
            this.shareToFacebook();
          }
        },{
          cssClass: 'cancel',
          role: 'cancel',
          handler: () => {
            console.log('cancel');
            this.sayThankYou();
          }
        }
      ]
    });

    actionSheet.present();
  }

  addPhoto() {
    this.pinPhotosService.getPhoto().then((imageData) => {
      this.imageBase64 = 'data:image/jpeg;base64,' + imageData;
      let params = {
        'photo': {
          'name': this.imageBase64,
          'pin_id': this.pin.id,
          'user_id': this.userId
        }
      }

      this.loading.show();
      this.pinPhotosService.create(params).then((photo) => {
        this.loading.hide();
        this.sayThankYou();
      });

    }, (err) => {
      console.log('error : ', err);
    });
  }

  shareToFacebook() {
    this.marker.getPosition().then((latlng) => {
      let latlngUrl = latlng.toUrlValue();

      this.facebook.showDialog({
        method: 'share',
        href: "https://maps.googleapis.com/maps/api/staticmap?center=" + latlngUrl
              + "&zoom=13&scale=2&size=600x300&markers=color:blue|label:S|"
              + latlngUrl,
        caption: '',
        description: ''
      }).then((data) => {
        this.sayThankYou();
      }, (erro) => {
        this.sayThankYou();
      })
    })
  }

  sayThankYou() {
    let popover = this.popoverCtrl.create(ThanksPopOver, {'map': this.map}, {cssClass: 'thanks-popover'});

    popover.onDidDismiss(pin => {
      this.map.setClickable(true);
    });

    popover.present();
  }
}
