import { Injectable } from '@angular/core'
import { IMqttMessage, MqttService } from 'ngx-mqtt'
import { Song } from '../objects/song'
  
@Injectable()
export class Communicator {
    
    private subscription: any
    public message: string
    public bol: boolean = false
  
    constructor(public _mqttService: MqttService){
        
    }

   /* getSongList(): Promise<Array<Song>> {
        return new Promise((resolve, error) => {

        }) 
    }*/
    
    public getSongListString(): Array<Song>{
        let songs: Array<Song> = [];
        this.subscription = this._mqttService.observe('beatarea/v1/lms/media/tracks').subscribe((mqttMessage: IMqttMessage) => {
            this.message = JSON.parse(mqttMessage.payload.toString());
            console.log(this.message)

            this.message["tracklist"].forEach(element => {
              let song: Song = element as Song;
              songs.push(song);
              
            });
          });
          return songs
    }

    pushTrack(trackID: Number){    
      this._mqttService.unsafePublish(
        "beatarea/v1/lms/user/luca/command",
        JSON.stringify({
          "command" : "play",
          "parameters" : [trackID]
        }),
        {qos: 1, retain: false}
      );  
    }

    pauseTrack(){
      this._mqttService.unsafePublish(
        "beatarea/v1/lms/user/luca/command",
        JSON.stringify({
          "command" : "pause"
        }),
        {qos: 1, retain: false}
      );  
    }
}
//steal this bro: https://medium.com/javascript-everyday/singleton-made-easy-with-typescript-6ad55a7ba7ff