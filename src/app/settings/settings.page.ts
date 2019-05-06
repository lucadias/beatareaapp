import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'

import { Observable } from 'rxjs';
import {
  IMqttMessage,
  MqttModule,
  IMqttServiceOptions,
  MqttService
} from 'ngx-mqtt';

declare function require(name:string);

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})


export class SettingsPage  {


  private subscription: any;
  public message: string;

  constructor(public navCtrl: NavController, public _mqttService: MqttService) { 
    this.subscription = this._mqttService.observe('beatarea/v1/lms/media/tracks').subscribe((message: IMqttMessage) => {
      this.message = message.payload.toString();
      console.log(this.message)
    });
  }

  saveSettings(){
    this.navCtrl.navigateBack('/main');
  }

  onRenderItems(ev) {
    console.log(`Moving item from ${ev.detail.from} to ${ev.detail.to}`);

    //this.dataList = reorderArray(this.dataList, ev.detail.from, ev.detail.to);
    ev.detail.complete();
  }



  testMQTT(){    
    this._mqttService.unsafePublish("test/luca", "hallo123", {qos: 1, retain: true});
/*
    var mqtt = require('mqtt')
    var client  = mqtt.connect('mqtt://192.168.1.119')

    client.on('connect', function () {
      client.subscribe('presence', function (err) {
        if (!err) {
          client.publish('presence', 'Hello mqtt')
        }
      })
    })

    client.on('message', function (topic, message) {
      // message is Buffer
      console.log(message.toString())
      client.end()
    })*/

  }
}


