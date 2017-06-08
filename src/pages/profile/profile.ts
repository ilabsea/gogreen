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

  constructor(private facebook: Facebook, public navCtrl: NavController,
              private storage: Storage, private app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');
  }

  logout() {
    let self = this;
    this.facebook.logout().then(function(response) {
      self.storage.set('isLogged', false);
      self.app.getRootNav().setRoot(LoginPage);
    });
  }

}
