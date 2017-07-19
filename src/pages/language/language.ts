import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-language',
  templateUrl: 'language.html',
  providers: []
})

export class LanguagePage {
  private languages = [
    {
      name: 'English',
      code: 'en',
    },
    {
      name: 'ខ្មែរ',
      code: 'km'
    }
  ];

  private languageCode;

  constructor(public navCtrl: NavController, public translate: TranslateService) {
    this.languageCode = localStorage.getItem('languageCode') || 'en';
  }

  selectLanguage() {
    localStorage.setItem('languageCode', this.languageCode);

    this.translate.setDefaultLang(this.languageCode);
    this.navCtrl.pop(LanguagePage);
  }
}
