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
  private creatorName: any = 'Sopheak Kim';
  private profileLink: any;

  constructor(public navParams: NavParams, private endpoint: Endpoint, private facebook: Facebook,) {
    this.event = navParams.get('event');
    this.url = endpoint.url;
    this.creatorPicture = "https://graph.facebook.com/" + this.event['user_id'] + "/picture?type=small";
    // this.creatorPicture = 'https://scontent.fpnh4-1.fna.fbcdn.net/v/t1.0-9/13001255_1133639440000791_989390100380862014_n.jpg?oh=2eb1a18499cd7c4bec944b35a5090b37&oe=59F3F553';
    this.profileLink = "https://www.facebook.com/profile.php?id=" + this.event['user_id'];
  }

  ionViewDidLoad(){
    this.setCreatorName();
  }

  setCreatorName() {
    let self = this;
    this.facebook.api("/" + this.event['user_id'] +"?fields=name" , []).then(function(user) {
      self.creatorName = user.name || 'Sopheak Kim';
    })
  }
}
