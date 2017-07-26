import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { UserService } from '../../providers/user-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, private facebook: Facebook,
              private storage: Storage, public userService: UserService) {
  }

  facebookLogin(){
    var self = this;
    self.facebook.login(['email']).then( (response) => {
      self.userService.create({facebook_id: response.authResponse.userID}).then((user) => {
        self.storage.set('isLogged', true);
        self.storage.set('userID', user['id']);
        self.storage.set('userFacebookID', user['facebook_id']);
        self.navCtrl.setRoot(TabsPage);
      });
    }).catch((error) => {
      console.log(error)
    });
  }

}
