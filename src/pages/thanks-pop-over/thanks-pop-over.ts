import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-thanks-pop-over',
  templateUrl: 'thanks-pop-over.html'
})

export class ThanksPopOver {
  map: any;

  constructor(public navParams: NavParams,
              public viewCtrl: ViewController) {
    this.map = navParams.data.map;
  }

  close() {
    this.map.setClickable(true);
    this.viewCtrl.dismiss();
  }

}
