import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Events } from '../../providers/events';
import { ShowEventPage } from '../show-event/show-event';
import { Loading } from '../../providers/loading';
import { Endpoint } from '../../providers/endpoint';
import { Facebook } from '@ionic-native/facebook';
import { FormEventPage } from '../form-event/form-event';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
  providers: [Events, Endpoint]
})

export class EventsPage {

  private events: any;
  private url = '';
  private pageNum;

  constructor(public navCtrl: NavController, private eventsService: Events,
              private loading: Loading, private endpoint: Endpoint,
              private facebook: Facebook) {
    this.url = endpoint.url;
  }

  ionViewDidLoad() {
    this.getEvents();
  }

  getEvents() {
    this.pageNum = 1;
    this.loading.show();
    this.eventsService.getAll(this.pageNum).then((events) => {
      this.pageNum += 1;
      this.events = events;
      this.loading.hide();
    });
  }

  getMoreItems(infiniteScroll) {
    this.eventsService.getAll(this.pageNum).then((events) => {
      if (events['length'] > 0) {
        this.pageNum += 1;
      }
      this.events = this.events.concat(events);

      infiniteScroll.complete();
    });
  }

  refreshPage() {
    this.getEvents();
  }

  goToForm() {
    this.navCtrl.push(FormEventPage, { "parentPage": this });
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
