import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  constructor(public navCtrl: NavController, public navParams: NavParams, private facebook: Facebook) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  facebookLogin(){
    this.facebook.login(['email']).then( (response) => {
        console.log('response : ', response);
    }).catch((error) => { console.log(error) });
  }

}
