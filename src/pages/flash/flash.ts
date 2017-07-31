import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IntroPage } from '../intro/intro';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-flash',
  templateUrl: 'flash.html'
})

export class FlashPage {
  constructor(public navCtrl: NavController) {}

  ngOnInit() {
    setTimeout(() => {
      if (localStorage.getItem('introVisited') == 'true') {
        this.navCtrl.setRoot(LoginPage);
      } else {
        this.navCtrl.setRoot(IntroPage);
      }
    }, 3000);
  }
}
