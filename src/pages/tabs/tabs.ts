import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { EventsPage } from '../events/events';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  tabHome: any = HomePage;
  tabProfile: any = ProfilePage;
  tabEvent: any = EventsPage;

  constructor() {

  }
}
