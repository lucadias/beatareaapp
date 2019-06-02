import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'
import { Communicator } from '../services/communicator'

import { interval } from 'rxjs';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})


export class SettingsPage {


  tracker1: String
  tracker2: String
  tracker3: String

  constructor(public navCtrl: NavController, public coo: Communicator) {
  }

  saveSettings() {
    this.navCtrl.navigateBack('/main');
  }

  onRenderItems(ev) {
    console.log(`Moving item from ${ev.detail.from} to ${ev.detail.to}`);

    //this.dataList = reorderArray(this.dataList, ev.detail.from, ev.detail.to);
    ev.detail.complete();
  }
  backToOnboarding() {
    localStorage.setItem("skipuserlogin", "false")
    this.navCtrl.navigateBack('/home');
  }

}


