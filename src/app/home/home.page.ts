import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Sim } from '@ionic-native/sim/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  simInfo;

  constructor(private platform: Platform,
              private sim: Sim) {}

  getSimInfo() {
    this.platform.ready().then(() => {
      const result = this.checkPermission();

      if (result) {
        this.sim.getSimInfo().then(
            (info) => {
              console.log('Sim info: ', info);
              this.simInfo = info;
            },
            (err) => console.log('Unable to get sim info: ', err)
        );
      }
    });
  }

  checkPermission() {
    if (this.platform.is('android')) {
      // Android Only
      this.sim.hasReadPermission().then((info) => {
            console.log('Has permission: ', info);
            if (info) {
              return true;
            } else {
              this.sim.requestReadPermission().then(
                  () => {
                    console.log('Permission granted');
                    return true;
                  },
                  () => {
                    console.log('Permission denied');
                    return false;
                  }
              );
            }
          }
      ).catch(err => {
        console.log(err);
        return false;
      });
    } else {
      return true;
    }
  }
}
