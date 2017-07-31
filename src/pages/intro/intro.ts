import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})

export class IntroPage {
  constructor(public navCtrl: NavController, public translate: TranslateService) {}

  ngOnInit() {
    localStorage.setItem('languageCode', 'km');
    this.translate.setDefaultLang('km');

    if (localStorage.getItem('introVisited') == 'true') {
      this.navCtrl.setRoot(LoginPage);
    }
  }

  goToHome(){
    localStorage.setItem('introVisited', 'true');
    this.navCtrl.setRoot(LoginPage);
  }
}
