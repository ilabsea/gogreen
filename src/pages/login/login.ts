import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, private facebook: Facebook, private storage: Storage) {
  }
  
  facebookLogin(){
    this.facebook.login(['email']).then( (response) => {
      console.log('response : ', response);
      this.storage.set('isLogged', true);
      this.navCtrl.push(TabsPage, {}, {animate: false});
    }).catch((error) => {
      console.log(error)
    });
  }

}
