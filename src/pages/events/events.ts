import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventService } from '../../providers/events';
import { ShowEventPage } from '../show-event/show-event';
import { Loading } from '../../providers/loading';
import { Endpoint } from '../../providers/endpoint';
import { Facebook } from '@ionic-native/facebook';
import { FormEventPage } from '../form-event/form-event';
import { Events } from 'ionic-angular';

import { Network } from '@ionic-native/network';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
  providers: [EventService, Endpoint]
})

export class EventsPage {

  private events: any;
  private url = '';
  private pageNum;
  private disconnected: any;

  constructor(public navCtrl: NavController, private eventsService: EventService,
              private loading: Loading, private endpoint: Endpoint,
              private facebook: Facebook, public ionEvents: Events,
              private network: Network, private toast: Toast) {
    this.url = endpoint.url;
  }

  ionViewDidLoad() {
    this.getEvents();
    this.onSubscribeNetwork();
  }

  ionViewDidLeave() {
    this.ionEvents.publish('tab:leave', {});
    this.disconnected.unsubscribe();
    this.toast.hide();
  }

  onSubscribeNetwork() {
    this.disconnected = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      this.alertDisconnect();
    });
  }

  alertDisconnect() {
    this.toast.show(`Can't connect right now.`, '10000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

  getEvents() {
    if (!navigator.onLine) {
      this.alertDisconnect();
      return;
    }

    this.pageNum = 1;
    this.loading.show();
    this.eventsService.getAll(this.pageNum).then((events) => {
      this.pageNum += 1;
      this.events = events;
      this.loading.hide();
    });
  }

  getMoreItems(infiniteScroll) {
    if (!navigator.onLine) {
      this.alertDisconnect();
      return;
    }

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
      href: event.facebook_link,
      caption: event.title,
      description: event.description
    });
    $event.stopPropagation();
  }

}
