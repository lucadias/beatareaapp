import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'
import { CordovaMqTTPlugin } from 'cordova-plugin-mqtt'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(public navCtrl: NavController) { 
    
  }

  ngOnInit() {
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
    cordova.plugins.CordovaMqTTPlugin.connect({
      url:"tcp://test.mosquitto.org", //a public broker used for testing purposes only. Try using a self hosted broker for production.
      port:1883,
      clientId:"YOUR_USER_ID_LESS_THAN_24_CHARS",
      connectionTimeout:3000,
      willTopicConfig:{
          qos:0, //default is 0
          retain:true, //default is true
          topic:"<will topic>",
          payload:"<will topic message>"
      },
      username:"uname",
      password:'pass',
      keepAlive:60,
      isBinaryPayload: false, //setting this 'true' will make plugin treat all data as binary and emit ArrayBuffer instead of string on events
      success:function(s){
          console.log("connect success");
      },
      error:function(e){
          console.log("connect error");
      },
      onConnectionLost:function (){
          console.log("disconnect");
      },
      routerConfig:{
          router:routerObject //instantiated router object
          publishMethod:"emit", //refer your custom router documentation to get the emitter/publishing function name. The parameter should be a string and not a function.
          useDefaultRouter:false //Set false to use your own topic router implementation. Set true to use the stock topic router implemented in the plugin.
      }
  })
  }

}
