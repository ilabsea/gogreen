import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from '../pages/intro/intro';
import { BadgePage } from '../pages/badge/badge';
import { FaqPage } from '../pages/faq/faq';
import { FlashPage } from '../pages/flash/flash';
import { PhotoPage } from '../pages/photo/photo';
import { ChangeOptionActionSheetPage } from '../pages/change-option-action-sheet/change-option-action-sheet';

import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  // rootPage:any = FaqPage;
  // rootPage:any = TabsPage;
  // rootPage:any = LoginPage;
  // rootPage:any = IntroPage;
  // rootPage:any = ChangeOptionActionSheetPage;
  rootPage:any = FlashPage;
  hasRoot: any = false;

  constructor(platform: Platform, private storage: Storage, statusBar: StatusBar,
              splashScreen: SplashScreen, translate: TranslateService ) {
    platform.ready().then(() => {
      translate.setDefaultLang(localStorage.getItem('languageCode') || 'en');
      statusBar.backgroundColorByHexString("#10A224");
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
