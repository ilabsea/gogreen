import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { BadgeInfoPage } from '../badge-info/badge-info';

@Component({
  selector: 'page-badge',
  templateUrl: 'badge.html',
})

export class BadgePage {

  private user;
  private badges = [
   {
     name: 'help',
     icon: 'assets/badge/help.png'
   },
   {
     name: 'warrior',
     icon: 'assets/badge/warrior.png'
   },
   {
     name: 'hero',
     icon: 'assets/badge/hero.png'
   },
   {
     name: 'star',
     icon: 'assets/badge/star.png'
   },
   {
     name: 'heart',
     icon: 'assets/badge/heart.png'
   }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl: App) {
    this.user = { name: 'sokly', user_id: '11', pin_count: 1, event_count: 3 };
  }

  ionViewDidLoad(){
    this.formatData();
  }

  formatData() {
    for(var i = 0; i < this.badges.length; i++){
      if ((this.badges[i].name == 'help' && this.user.pin_count >= 3) ||
          (this.badges[i].name == 'warrior' && this.user.pin_count >= 10) ||
          (this.badges[i].name == 'hero' && this.user.event_count >= 3) ||
          (this.badges[i].name == 'star' && this.user.event_count >= 10) ||
          (this.badges[i].name == 'heart' && this.user.pin_count >= 10 && this.user.event_count >= 10)) {
        this.badges[i]['active'] = true;
      }
    }
  }

  goToBadgeInfo() {
    this.appCtrl.getRootNav().push(BadgeInfoPage);
  }
}
