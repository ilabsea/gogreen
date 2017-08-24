import { ViewController, NavParams , PopoverController} from 'ionic-angular';
import { Component, ElementRef } from '@angular/core';
import { PinsService } from '../../providers/pins-service';
import { ActionSheetController, NavController } from 'ionic-angular';
import { PinPhotosService } from '../../providers/pin-photos-service';
import { Loading } from '../../providers/loading';
import { PhotoPage } from '../photo/photo';
import { NewPinActionSheetPage } from '../new-pin-action-sheet/new-pin-action-sheet';
import { DatePipe } from '@angular/common'
import { TranslateService } from '@ngx-translate/core';

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
              private datePipe: DatePipe, public translate: TranslateService, private elementRef: ElementRef) {
    this.map = navParams.data.map;
    this.marker = navParams.data.marker;
    this.pin = navParams.data.pin;
    this.userId = navParams.data.userId;

    // this.map = {};
    // this.marker = {};
    // this.pin = {id: 118, icon: 'sad', created_at: "2017-08-24T04:34:15.000Z"};
    // this.userId = 1;
  }

  ngOnInit() {
    this.showActionSheet();
  }

  te(keyword) {
    return this.translate.instant(keyword);
  }

  showActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: this.te('CREATED_ON') + ' ' + this.datePipe.transform(this.pin.created_at, 'dd/MM/yyyy-h:mm a'),
      cssClass: 'my-action-sheets',
      buttons: [
        {
          text: this.te('IT_' + this.pin.icon.toUpperCase()) + ' (' + this.te('CHANGE') +')',
          cssClass: 'change-pin ' + this.pin.icon,
          icon: this.pin.icon,
          handler: () => {
            this.openChangePin();
          }
        },{
          text: this.te('VIEW_IMAGES'),
          cssClass: 'share',
          icon: 'images',
          handler: () => {
            this.viewImages();
          }
        },{
          cssClass: 'cancel',
          role: 'cancel',
          handler: () => {
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
    this.viewCtrl.dismiss();
    this.navCtrl.push(PhotoPage, {'pin': this.pin, 'map': this.map, 'userId': this.userId});
  }
}
