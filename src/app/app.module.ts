import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook } from '@ionic-native/facebook';
import { GoogleMaps } from '../providers/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';

import { AppVersion } from '@ionic-native/app-version';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { ThanksPopOver } from '../pages/thanks-pop-over/thanks-pop-over';
import { PhotoPage } from '../pages/photo/photo';
import { FormEventPage } from '../pages/form-event/form-event';
import { EventsPage } from '../pages/events/events';
import { ShowEventPage } from '../pages/show-event/show-event';
import { LanguagePage } from '../pages/language/language';
import { FaqPage } from '../pages/faq/faq';
import { BadgePage } from '../pages/badge/badge';
import { BadgeInfoPage } from '../pages/badge-info/badge-info';
import { AboutusPage } from '../pages/aboutus/aboutus'
import { IntroPage } from '../pages/intro/intro'
import { NewPinActionSheetPage } from '../pages/new-pin-action-sheet/new-pin-action-sheet'
import { ChangeOptionActionSheetPage } from '../pages/change-option-action-sheet/change-option-action-sheet'

import { Loading } from '../providers/loading';
import { EventService } from '../providers/events';
import { Endpoint } from '../providers/endpoint';
import { PinsService } from '../providers/pins-service';
import { PinPhotosService } from '../providers/pin-photos-service';
import { UserService } from '../providers/user-service';
import { NetworkConnection } from '../providers/network-connection';

// Translation
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Http } from '@angular/http';
// Network
import { Network } from '@ionic-native/network';
import { Toast } from '@ionic-native/toast';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    ProfilePage,
    ThanksPopOver,
    PhotoPage,
    EventsPage,
    FormEventPage,
    ShowEventPage,
    LanguagePage,
    FaqPage,
    BadgePage,
    BadgeInfoPage,
    AboutusPage,
    IntroPage,
    NewPinActionSheetPage,
    ChangeOptionActionSheetPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true
    }),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    ProfilePage,
    ThanksPopOver,
    PhotoPage,
    EventsPage,
    FormEventPage,
    ShowEventPage,
    LanguagePage,
    FaqPage,
    BadgePage,
    BadgeInfoPage,
    AboutusPage,
    IntroPage,
    NewPinActionSheetPage,
    ChangeOptionActionSheetPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    GoogleMaps,
    Geolocation,
    PinsService,
    PinPhotosService,
    UserService,
    Endpoint,
    Camera,
    Network,
    Toast,
    EventService,
    Loading,
    NetworkConnection,
    AppVersion,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
