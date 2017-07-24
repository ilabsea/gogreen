import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-badge-info',
  templateUrl: 'badge-info.html',
})

export class BadgeInfoPage {
  private badges = [
   {
     name: 'Green Helper',
     icon: 'assets/badge/help.png',
     description: 'GREEN_HELPER_DESCRIPTION'
   },
   {
     name: 'Green Warrior',
     icon: 'assets/badge/warrior.png',
     description: 'GREEN_WARRIOR_DESCRIPTION'
   },
   {
     name: 'Green Hero',
     icon: 'assets/badge/hero.png',
     description: 'GREEN_HERO_DESCRIPTION'
   },
   {
     name: 'Green Star',
     icon: 'assets/badge/star.png',
     description: 'GREEN_STAR_DESCRIPTION'
   },
   {
     name: 'Green Heart',
     icon: 'assets/badge/heart.png',
     description: 'GREEN_HEART_DESCRIPTION'
   }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
