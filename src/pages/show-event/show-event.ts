import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-show-event',
  templateUrl: 'show-event.html',
})
export class ShowEventPage {
  private event: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.event = navParams.get('event');
    console.log('this.event : ', this.event);

  }

  ionViewDidLoad() {
    
  }

}
