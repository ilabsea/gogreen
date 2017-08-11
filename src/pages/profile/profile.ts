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

import { Network } from '@ionic-native/network';
import { Toast } from '@ionic-native/toast';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [PinsService]
})
export class ProfilePage {
  userProfile: any;
  userName: any;
  badgeType: any;
  disconnected: any;

  constructor(private facebook: Facebook, public navCtrl: NavController,
              private storage: Storage, private app: App,
              private pinsService: PinsService, public events: Events,
              private network: Network, private toast: Toast,
              public translate: TranslateService) {
  }

  ionViewDidLeave() {
    this.events.publish('tab:leave', {});
    this.disconnected.unsubscribe();
    this.toast.hide();
  }

  ionViewDidLoad() {
    let self = this;

    this.storage.get('userFacebookID').then(fbUerId => {
      this.userProfile = "https://graph.facebook.com/" + fbUerId + "/picture?width=100";
      this.facebook.api("/" + fbUerId + "?fields=name" , []).then(function(user) {
        self.userName = user.name;
      })
    });

    this.onSubscribeNetwork();
  }

  onSubscribeNetwork() {
    this.disconnected = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      this.alertDisconnect();
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

  logout() {
    let self = this;
    this.facebook.logout().then(function(response) {
      self.storage.set('isLogged', false);
      self.storage.set('userID', "");
      self.app.getRootNav().setRoot(LoginPage);
    });
  }

  inviteFiends() {
    this.facebook.appInvite({ url: "https://fb.me/1145545555578631",
        picture: "http://laoblogger.com/images/children-cleaning-up-montessori-work-clipart-7.jpg"
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
