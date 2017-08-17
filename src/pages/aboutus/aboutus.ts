import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';

@Component({
  selector: 'page-aboutus',
  templateUrl: 'aboutus.html',
})
export class AboutusPage {
  versionNumber: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private appVersion: AppVersion) {
  }

  async getAppNumber() {
    this.versionNumber = await this.appVersion.getVersionNumber();
  }

  ionViewDidLoad() {
    this.getAppNumber();
  }

}
