import { Component } from '@angular/core';

import { HomePage } from '../home/home';
// import { PinPage } from '../pin/pin';
import { ProfilePage } from '../profile/profile';
import { EventPage } from '../event/event';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabHome: any = HomePage;
  tabProfile: any = ProfilePage;
  tabEvent: any = EventPage;

  constructor() {

  }
}
