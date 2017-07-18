import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Endpoint } from '../../providers/endpoint';
import { Facebook } from '@ionic-native/facebook';

@Component({
  selector: 'page-show-event',
  templateUrl: 'show-event.html',
  providers: [Endpoint]
})
export class ShowEventPage {
  private event: any;
  private url = '';
  private creatorPicture: any;
  private creatorName: any;
  private profileLink: any;

  constructor(public navParams: NavParams, private endpoint: Endpoint, private facebook: Facebook,) {
    this.event = navParams.get('event');
    this.url = endpoint.url;
    this.creatorPicture = "https://graph.facebook.com/100000632243863/picture?type=small";
    this.profileLink = "https://www.facebook.com/profile.php?id=" + this.event['user_id'];
  }

  ionViewDidLoad(){
    this.setCreatorName();
  }

  setCreatorName() {
    let self = this;
    this.facebook.api("/" + this.event['user_id'] +"?fields=name" , []).then(function(user) {
      self.creatorName = user.name;
    })
  }
}
