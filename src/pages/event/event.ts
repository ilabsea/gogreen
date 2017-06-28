import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormEventsPage } from '../form-events/form-events'

@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Event');
  }

  shareEvents(){
    this.navCtrl.push(FormEventsPage);
  }

  viewEvents(){

  }

}
