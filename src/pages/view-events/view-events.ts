import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from '../../providers/events';
import { ShowEventPage } from '../show-event/show-event';
import { Loading } from '../../providers/loading';
import { Endpoint } from '../../providers/endpoint';
import { Facebook } from '@ionic-native/facebook';

@Component({
  selector: 'page-view-events',
  templateUrl: 'view-events.html',
  providers: [Events, Endpoint]
})
export class ViewEventsPage {

  private events: any;
  private url = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private eventsService: Events, private loading: Loading,
              private endpoint: Endpoint, private facebook: Facebook) {
    this.url = endpoint.url;
  }

  ionViewDidLoad() {
    this.loading.show();
    this.eventsService.get().then((events) => {
      this.events = events["events"];
      this.loading.hide();
    });
  }

  showDetail(event, $event){
    this.navCtrl.push(ShowEventPage, {'event': event})
  }

  share(event, $event) {
    this.facebook.showDialog({
      method: 'share',
      href: event.link,
      caption: event["title"],
      description: event["description"]
    });
    $event.stopPropagation();
  }

}
