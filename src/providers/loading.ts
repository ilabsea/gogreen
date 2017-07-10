import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';


@Injectable()
export class Loading {
  loading: any;

  constructor(public loadingCtrl: LoadingController) {
    console.log('Hello Loading Provider');
  }

  show() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      spinner: 'circles'
    });
    this.loading.present();
  }

  hide(){
    this.loading.dismiss();
  }

}
