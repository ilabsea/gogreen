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
     description: 'Place pin on map at least 3 times'
   },
   {
     name: 'Green Warrior',
     icon: 'assets/badge/warrior.png',
     description: 'Place pin on the map at least 10 times'
   },
   {
     name: 'Green Hero',
     icon: 'assets/badge/hero.png',
     description: 'Organize at least 3 events'
   },
   {
     name: 'Green Star',
     icon: 'assets/badge/star.png',
     description: 'Organize at least 10 events'
   },
   {
     name: 'Green Heart',
     icon: 'assets/badge/heart.png',
     description: 'Place pin on map and organize event more than 10 times'
   }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
