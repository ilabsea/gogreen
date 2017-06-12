import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  userProfile: any;
  userName: any;

  constructor(private facebook: Facebook, public navCtrl: NavController,
              private storage: Storage, private app: App) {
  }

  ionViewDidLoad() {
    let userId = this.storage.get('userId');
    let self = this;
    let params = new Array<string>();
    this.facebook.api("/me?fields=name" , params).then(function(user) {
      self.userProfile = "https://graph.facebook.com/" + user["id"] + "/picture";
      self.userName = user.name;
    })
  }

  logout() {
    let self = this;
    this.facebook.logout().then(function(response) {
      self.storage.set('isLogged', false);
      self.app.getRootNav().setRoot(LoginPage);
    });
  }

  inviteFiends() {
    // this.facebook.appInvite( "https://play.google.com/store/apps/details?id=com.limmouyleng.powerconsumption");
  }

}
