import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Network } from '@ionic-native/network';
import { Toast } from '@ionic-native/toast';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class NetworkConnection {
  disconnected: any;

  constructor(private network: Network, private toast: Toast, public translate: TranslateService) {
  }

  onSubscribeNetwork() {
    this.disconnected = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      this.alertDisconnect();
    });
  }

  unsubscribe() {
    this.disconnected.unsubscribe();
  }

  alertDisconnect() {
    let msg = this.translate.instant('CANNOT_CONNECT_RIGHT_NOW');
    this.toast.show(msg, '10000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

  hideToast(){
    this.toast.hide();
  }
}
