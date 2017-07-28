import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html'
})

export class FaqPage {
  private shownGroup = null;
  private questions;

  constructor(public translate: TranslateService) {
    this.questions = [
      { title: 'WHAT_IS_GOGREEN_APP', answer: this.te('GOGREEN_DEFINITION') + '<br><br>' + this.te('GOGREEN_PURPOSE') },
      { title: 'HOW_TO_USE_GOGREEN_APP', answer: this.te('GOGREEN_USAGE') },
      { title: 'IS_THIS_FREE', answer: this.te('YES_IT_IS_FREE') },
      { title: 'HOW_CAN_I_ORGANISE_MY_OWN_CLEANUP', answer: this.te('WAY_TO_ORGANISE_OWN_CLEANUP') },
      { title: 'CONTACT_US_OR_LEAVE_FEEDBACK', answer: this.te('FEEL_FREE_TO_SEND_AN_EMAIL_AT') + ' <a href="mailto:gogreenkhm@gmail.com">gogreenkhm@gmail.com</a>.<br><br>' + this.te('YOU_CAN_JOIN_OUR_FACEBOOK_GROUP') }
    ];
  }

  te(keyword) {
    return this.translate.instant(keyword);
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };

  isGroupShown(group) {
    return this.shownGroup == group;
  };

}
