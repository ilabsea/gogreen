import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from '../pages/intro/intro';

import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  // rootPage:any = TabsPage;
  // rootPage:any = LoginPage;
  rootPage:any = IntroPage;
  hasRoot: any = false;

  constructor(platform: Platform, private storage: Storage, statusBar: StatusBar,
              splashScreen: SplashScreen, translate: TranslateService ) {
    platform.ready().then(() => {
      translate.setDefaultLang(localStorage.getItem('languageCode') || 'en');
      statusBar.styleDefault();
      splashScreen.hide();
      this.storage.get('isLogged').then(logged => {
        if (logged) {
           this.rootPage = TabsPage;
        }
        this.hasRoot = true;
      });
    });
  }
}
