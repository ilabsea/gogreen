import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook } from '@ionic-native/facebook';
import { GoogleMaps } from '../providers/google-maps';
import { Camera } from '../providers/camera';
import { Geolocation } from '@ionic-native/geolocation'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { EventPage } from '../pages/event/event';
import { ProfilePage } from '../pages/profile/profile';
import { PinPopoverPage } from '../pages/pin-pop-over/pin-pop-over';
import { PinInfoPage } from '../pages/pin-info/pin-info';
import { ThanksPopOver } from '../pages/thanks-pop-over/thanks-pop-over';
import { PinsService } from '../providers/pins-service';
import { PinPhotosService } from '../providers/pin-photos-service';
import { PhotoPage } from '../pages/photo/photo';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    EventPage,
    ProfilePage,
    PinPopoverPage,
    ThanksPopOver,
    PinInfoPage,
    PhotoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    EventPage,
    ProfilePage,
    PinPopoverPage,
    ThanksPopOver,
    PinInfoPage,
    PhotoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    GoogleMaps,
    PinsService,
    PinPhotosService,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
