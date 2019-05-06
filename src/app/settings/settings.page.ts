import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})


export class SettingsPage  {



  constructor(public navCtrl: NavController) { 
      }

  saveSettings(){
    this.navCtrl.navigateBack('/main');
  }

  onRenderItems(ev) {
    console.log(`Moving item from ${ev.detail.from} to ${ev.detail.to}`);

    //this.dataList = reorderArray(this.dataList, ev.detail.from, ev.detail.to);
    ev.detail.complete();
  }



  
}


