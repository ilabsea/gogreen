import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-reason',
  templateUrl: 'reason.html'
})

export class ReasonPage {
  reason: any;

  constructor(public navParams: NavParams) {
    this.reason = navParams.data.reason;
  }
}
