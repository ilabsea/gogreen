import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Endpoint } from '../../providers/endpoint';

@Component({
  selector: 'page-show-event',
  templateUrl: 'show-event.html',
  providers: [Endpoint]
})
export class ShowEventPage {
  private event: any;
  private url = '';

  constructor(public navParams: NavParams, private endpoint: Endpoint) {
    this.event = navParams.get('event');
    this.url = endpoint.url;
  }

  ionViewDidLoad() {
    console.log('this.event: ', this.event);
  }

}
