import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  constructor(public navCtrl: NavController, private facebook: Facebook) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  facebookLogin(){
    this.facebook.login(['email']).then( (response) => {
      console.log('response : ', response);
      this.navCtrl.push(HomePage, {}, {animate: false});
    }).catch((error) => {
      console.log(error)
    });
  }

}
