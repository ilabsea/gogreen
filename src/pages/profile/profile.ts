import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login';
import { FaqPage } from '../faq/faq';
import { BadgePage } from '../badge/badge';
import { AboutusPage } from '../aboutus/aboutus';
import { PinsService } from '../../providers/pins-service';
import { LanguagePage } from '../language/language';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [PinsService]
})
export class ProfilePage {
  userProfile: any;
  userName: any;
  badgeType: any;

  constructor(private facebook: Facebook, public navCtrl: NavController,
              private storage: Storage, private app: App,
              private pinsService: PinsService) {
  }

  ionViewDidLoad() {
    let self = this;
    this.facebook.api("/me?fields=name" , []).then(function(user) {
      self.userProfile = "https://graph.facebook.com/" + user["id"] + "/picture?width=100";
      self.userName = user.name;
    })
  }

  logout() {
    let self = this;
    this.facebook.logout().then(function(response) {
      self.storage.set('isLogged', false);
      self.storage.set('userID', "");
      self.app.getRootNav().setRoot(LoginPage);
    });
  }

  inviteFiends() {
    this.facebook.appInvite({ url: "https://fb.me/1096318540501333",
        picture: "https://www.logogarden.com/wp-content/uploads/lg-index/Example-Logo-6.jpg"
    }).then((obj) => {
      console.log('obj : ', obj);
    }, (obj) => {
        console.log(obj);
    } );
  }

  aboutus(){
    this.navCtrl.push(AboutusPage);
  }

  faq() {
    this.navCtrl.push(FaqPage);
  }

  goToLanguage() {
    this.navCtrl.push(LanguagePage);
  }

  viewBadges() {
    this.navCtrl.push(BadgePage);
  }
}
