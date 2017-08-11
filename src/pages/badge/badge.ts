import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { BadgeInfoPage } from '../badge-info/badge-info';
import { UserService } from '../../providers/user-service';
import { Storage } from '@ionic/storage';
import { Loading } from '../../providers/loading';
import { Toast } from '@ionic-native/toast';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-badge',
  templateUrl: 'badge.html',
})

export class BadgePage {
  private hasUser = false;
  private user = { name: '', user_id: '', pins_count: 0, events_count: 0 };
  private badges = [
   {
     name: 'Green Helper',
     icon: 'assets/badge/help.png',
     grey_icon: 'assets/badge/help_grey.png'
   },
   {
     name: 'Green Warrior',
     icon: 'assets/badge/warrior.png',
     grey_icon: 'assets/badge/warrior_grey.png'
   },
   {
     name: 'Green Hero',
     icon: 'assets/badge/hero.png',
     grey_icon: 'assets/badge/hero_grey.png'
   },
   {
     name: 'Green Star',
     icon: 'assets/badge/star.png',
     grey_icon: 'assets/badge/star_grey.png'
   },
   {
     name: 'Green Heart',
     icon: 'assets/badge/heart.png',
     grey_icon: 'assets/badge/heart_grey.png'
   }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public appCtrl: App, private storage: Storage,
              public userService: UserService, private loading: Loading,
              private toast: Toast, public translate: TranslateService) {
  }

  ionViewDidLoad(){
    this.getUser();
  }

  ionViewDidLeave() {
    this.toast.hide();
  }

  getUser() {
    if (!navigator.onLine) {
      this.alertDisconnect();
      return;
    }

    this.loading.show();

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

  alertDisconnect() {
    let msg = this.translate.instant('CANNOT_CONNECT_RIGHT_NOW');
    this.toast.show(msg, '10000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

  assignUser(user) {
    this.hasUser = true;
    this.user = user;
  }

  formatData() {
    for(var i = 0; i < this.badges.length; i++){
      if ((this.badges[i].name == 'Green Helper' && this.user.pins_count >= 3) ||
          (this.badges[i].name == 'Green Warrior' && this.user.pins_count >= 10) ||
          (this.badges[i].name == 'Green Hero' && this.user.events_count >= 3) ||
          (this.badges[i].name == 'Green Star' && this.user.events_count >= 10) ||
          (this.badges[i].name == 'Green Heart' && this.user.pins_count >= 10 && this.user.events_count >= 10)) {
        this.badges[i]['active'] = true;
      }
    }
  }

  goToBadgeInfo() {
    this.appCtrl.getRootNav().push(BadgeInfoPage);
  }
}
