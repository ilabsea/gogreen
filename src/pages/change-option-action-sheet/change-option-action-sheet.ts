import { ViewController, NavParams , PopoverController} from 'ionic-angular';
import { Component } from '@angular/core';
import { PinsService } from '../../providers/pins-service';
import { ActionSheetController, NavController } from 'ionic-angular';
import { PinPhotosService } from '../../providers/pin-photos-service';
import { Loading } from '../../providers/loading';
import { PhotoPage } from '../photo/photo';
import { NewPinActionSheetPage } from '../new-pin-action-sheet/new-pin-action-sheet';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'page-change-option-action-sheet',
  template: '',
  providers: [DatePipe]
})

export class ChangeOptionActionSheetPage {
  map: any;
  marker: any;
  pin: any;
  userId: any;

  constructor(public viewCtrl: ViewController, private navParams: NavParams,
              public pinsService: PinsService, public popoverCtrl: PopoverController,
              public actionSheetCtrl: ActionSheetController, public navCtrl: NavController,
              private pinPhotosService: PinPhotosService, private loading: Loading,
              private datePipe: DatePipe) {
    this.map = navParams.data.map;
    this.marker = navParams.data.marker;
    this.pin = navParams.data.pin;
    this.userId = navParams.data.userId;

    // this.pin = { id: 1, created_at: '2017-08-05T03:11:52.000Z'};
    // this.userId = 1;
  }

  ngOnInit() {
    this.showActionSheet();
  }

  showActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Created on ' + this.datePipe.transform(this.pin.created_at, 'dd/MM/yyyy'),
      cssClass: 'my-action-sheets',
      buttons: [
        {
          text: 'Change your pin',
          cssClass: 'change-pin',
          icon: 'pin',
          handler: () => {
            console.log('change pin');
            this.openChangePin();
          }
        },{
          text: 'View images',
          cssClass: 'share',
          icon: 'images',
          handler: () => {
            console.log('view image');
            this.viewImages();
          }
        },{
          cssClass: 'cancel',
          role: 'cancel',
          handler: () => {
            console.log('cancel');
            this.map.setClickable(true);
            this.viewCtrl.dismiss();
          }
        }
      ]
    });

    actionSheet.present();
  }

  openChangePin() {
    this.viewCtrl.dismiss();

    let popover = this.popoverCtrl.create(NewPinActionSheetPage,
      {"map": this.map, "pin": this.pin, "marker": this.marker},
      {cssClass: 'gogreen-action-sheets'}
    );
    popover.present();
  }

  viewImages() {
    this.navCtrl.push(PhotoPage, {'pin': this.pin, 'map': this.map, 'userId': this.userId});
  }
}
