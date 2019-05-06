import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {MqttModule, MqttService, IMqttServiceOptions} from 'ngx-mqtt'
import { Communicator } from './services/communicator';


export const MQTT_SERVICE_OPTIONS : IMqttServiceOptions = {
  hostname: '192.168.1.119',
  port: 9001,
  protocol: 'ws',
  path: '/'
  /*
  hostname: 'm24.cloudmqtt.com',
  port: 34541,
  password: 'verysafepw',
  username: 'luca',
  protocol: 'wss',
  path: '/*/
};

export function mqttServiceFactory() {
  return new MqttService(MQTT_SERVICE_OPTIONS);
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Communicator    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
