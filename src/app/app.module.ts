import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook } from '@ionic-native/facebook';
import { GoogleMaps } from '../providers/google-maps';
import { Camera } from '../providers/camera';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { PinPopoverPage } from '../pages/pin-pop-over/pin-pop-over';
import { PinInfoPage } from '../pages/pin-info/pin-info';
import { ThanksPopOver } from '../pages/thanks-pop-over/thanks-pop-over';
import { PhotoPage } from '../pages/photo/photo';
import { FormEventPage } from '../pages/form-event/form-event';
import { EventsPage } from '../pages/events/events';
import { ShowEventPage } from '../pages/show-event/show-event';
import { LanguagePage } from '../pages/language/language';

import { Loading } from '../providers/loading';
import { Events } from '../providers/events';
import { Endpoint } from '../providers/endpoint';
import { PinsService } from '../providers/pins-service';
import { PinPhotosService } from '../providers/pin-photos-service';

// Translation
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Http } from '@angular/http';

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
    PinPopoverPage,
    ThanksPopOver,
    PinInfoPage,
    PhotoPage,
    EventsPage,
    FormEventPage,
    ShowEventPage,
    LanguagePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
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
    PinPopoverPage,
    ThanksPopOver,
    PinInfoPage,
    PhotoPage,
    EventsPage,
    FormEventPage,
    ShowEventPage,
    LanguagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    GoogleMaps,
    PinsService,
    PinPhotosService,
    Endpoint,
    Camera,
    Events,
    Loading,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
