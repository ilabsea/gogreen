import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})

export class IntroPage {
  constructor(public navCtrl: NavController) {}

  ngOnInit() {
    if (localStorage.getItem('introVisited') == 'true') {
      this.navCtrl.setRoot(LoginPage);
    }
  }

  goToHome(){
    localStorage.setItem('introVisited', 'true');
    this.navCtrl.setRoot(LoginPage);
  }
}
