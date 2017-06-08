import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = LoginPage;
  hasRoot: any = true;

  constructor(platform: Platform, private storage: Storage, statusBar: StatusBar,
              splashScreen: SplashScreen ) {
    platform.ready().then(() => {
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
