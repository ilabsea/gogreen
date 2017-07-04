import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from '../../providers/events';
import { ShowEventPage } from '../show-event/show-event';

@Component({
  selector: 'page-view-events',
  templateUrl: 'view-events.html',
  providers: [Events]
})
export class ViewEventsPage {

  private events: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventsService: Events) {

  }

  ionViewDidLoad() {
    this.eventsService.get().then((events) => {
      console.log('events : ', events)
      this.events = events["events"];
    });
  }

  showDetail(event){
    this.navCtrl.push(ShowEventPage, {'event': event})
  }

}
