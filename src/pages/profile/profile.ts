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
import { Events } from 'ionic-angular';

import { NetworkConnection } from '../../providers/network-connection';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [PinsService, NetworkConnection]
})
export class ProfilePage {
  userProfile: any;
  userName: any;
  badgeType: any;

  constructor(private facebook: Facebook, public navCtrl: NavController,
              private storage: Storage, private app: App,
              private pinsService: PinsService, public events: Events,
              private network: NetworkConnection) {
  }

  ionViewDidLeave() {
    // Resolve subscribe event long click map
    this.events.publish('tab:leave', {});

    this.network.disconnected.unsubscribe();
    this.network.hideToast();
  }

  ionViewDidLoad() {
    let self = this;

    this.storage.get('userFacebookID').then(fbUerId => {
      this.userProfile = "https://graph.facebook.com/" + fbUerId + "/picture?width=100";
      this.facebook.api("/" + fbUerId + "?fields=name" , []).then(function(user) {
        self.userName = user.name;
      })
    });

    this.network.onSubscribeNetwork();
  }

  logout() {
    this.facebook.logout().then((response)=> {
      // Resolve logout to unsubscribe long click
      this.events.publish('logout', {});

      this.storage.set('isLogged', false);
      this.storage.set('userID', "");
      this.app.getRootNav().setRoot(LoginPage);
    });
  }

  inviteFiends() {
    this.facebook.appInvite({ url: "https://fb.me/1145545555578631",
        picture: "https://s3-ap-southeast-1.amazonaws.com/gogreen-production/gogreen.jpg"
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
