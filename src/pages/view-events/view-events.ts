import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from '../../providers/events';
import { ShowEventPage } from '../show-event/show-event';
import { Loading } from '../../providers/loading';

@Component({
  selector: 'page-view-events',
  templateUrl: 'view-events.html',
  providers: [Events]
})
export class ViewEventsPage {

  private events: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private eventsService: Events, private loading: Loading) {

  }

  ionViewDidLoad() {
    this.loading.show();
    this.eventsService.get().then((events) => {
      this.events = events["events"];
      this.loading.hide();
    });
  }

  showDetail(event){
    this.navCtrl.push(ShowEventPage, {'event': event})
  }

}
