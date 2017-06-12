import { ViewController, NavParams , PopoverController} from 'ionic-angular';
import { Component } from '@angular/core';
import { ThanksPopOver } from '../thanks-pop-over/thanks-pop-over';
import { PinsService } from '../../providers/pins-service';

@Component({
  selector: 'page-pin-pop-over',
  templateUrl: 'pin-pop-over.html',
  providers: [PinsService]
})

export class PinPopoverPage {
  mapMarker: any;
  icon: any;

  constructor(public viewCtrl: ViewController, private navParams: NavParams,
              public pinsService: PinsService, public popoverCtrl: PopoverController) {
    this.mapMarker = navParams.get('mapMarker');
  }

  ionViewDidLeave(){
    let self = this;
    this.mapMarker.marker.getPosition((position) => {
      let lat = position.lat;
      let lng = position.lng;
      let pinParams = {
        "pin": {
          latitude: lat,
          longitude: lng,
          icon: this.icon,
          user_id: 1
        }
      }
      this.pinsService.createPin(pinParams).then((pin) => {
        self.popupThanks(pin["id"]);
      }, (error) => {
        console.log('error : ', error);
      });
    })
  }

  addPin(param) {
    this.icon = 'www/assets/icon/' + param + '-small.png';
    this.mapMarker.marker.setIcon(this.icon);
  }

  removeMarker(){
    this.mapMarker.marker.remove();
    this.close();
  }

  close() {
    this.viewCtrl.dismiss();
  }

  popupThanks(pinId) {
    let popover = this.popoverCtrl.create(ThanksPopOver, {
      'mapMarker' : { 'map': this.mapMarker.map, 'marker': this.mapMarker.marker, 'pinId' : pinId }
    }, {cssClass: 'thanks-popover'});
    popover.present();
  }
}
