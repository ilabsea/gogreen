import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { BadgeInfoPage } from '../badge-info/badge-info';
import { UserService } from '../../providers/user-service';
import { Storage } from '@ionic/storage';
import { Loading } from '../../providers/loading';

@Component({
  selector: 'page-badge',
  templateUrl: 'badge.html',
})

export class BadgePage {
  private hasUser = false;
  private user = { name: '', user_id: '', pins_count: 0, events_count: 0 };
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public appCtrl: App, private storage: Storage,
              public userService: UserService, private loading: Loading) {
    this.loading.show();
  }

  ionViewDidLoad(){
    this.getUser();
  }

  getUser() {
    var self = this;
    this.storage.get('userID').then((userId) => {
      self.userService.get(userId).then((user) => {
        self.assignUser(user);
        self.formatData();
        self.loading.hide();
      }, (error) => {
        console.log('error : ', error);
      });
    });
  }

  assignUser(user) {
    this.hasUser = true;
    this.user = user;
  }

  formatData() {
    for(var i = 0; i < this.badges.length; i++){
      if ((this.badges[i].name == 'help' && this.user.pins_count >= 3) ||
          (this.badges[i].name == 'warrior' && this.user.pins_count >= 10) ||
          (this.badges[i].name == 'hero' && this.user.events_count >= 3) ||
          (this.badges[i].name == 'star' && this.user.events_count >= 10) ||
          (this.badges[i].name == 'heart' && this.user.pins_count >= 10 && this.user.events_count >= 10)) {
        this.badges[i]['active'] = true;
      }
    }
  }

  goToBadgeInfo() {
    this.appCtrl.getRootNav().push(BadgeInfoPage);
  }
}
