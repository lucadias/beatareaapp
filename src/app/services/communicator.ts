import { Injectable } from '@angular/core'
import { IMqttMessage, MqttService } from 'ngx-mqtt'
import { Song } from '../objects/song'

  
@Injectable()
export class Communicator {
    
    private songlistsubscribtion: any
    private usercallbacksubscribtion: any
    private songstatussubscribtion: any
    private trackersub1: any
    private trackersub2: any
    private trackersub3: any
    public songslists: string
    public bol: boolean = false
    public songtimestatus: number
    public trackervalues: String[]

    constructor(public _mqttService: MqttService){
      this.trackervalues = ["0","0","0"]
      this.songstatussubscribtion = this._mqttService.observe('beatarea/v1/$SYS/user/register-callback').subscribe((mqttMessage: IMqttMessage) => {
        this.songtimestatus = JSON.parse(mqttMessage.payload.toString())["time"]  
     })
     this.trackersub1 = this._mqttService.observe('beatarea/v1/tracker/test-tracker-1/1C:15:1F:AB:B3:FC').subscribe((mqttMessage: IMqttMessage) => {
      this.trackervalues[0] = mqttMessage.payload.toString()
          
    })
    this.trackersub2 = this._mqttService.observe('beatarea/v1/tracker/test-tracker-2/1C:15:1F:AB:B3:FC').subscribe((mqttMessage: IMqttMessage) => {
      this.trackervalues[1] = mqttMessage.payload.toString()    
    })
    this.trackersub3 = this._mqttService.observe('beatarea/v1/tracker/test-tracker-3/1C:15:1F:AB:B3:FC').subscribe((mqttMessage: IMqttMessage) => {
      this.trackervalues[2] = mqttMessage.payload.toString()     
    })
    }


    public getSongListString(): Array<Song>{
      let songs: Array<Song> = [];
        this.songlistsubscribtion = this._mqttService.observe('beatarea/v1/lms/media/tracks').subscribe((mqttMessage: IMqttMessage) => {
            this.songslists = JSON.parse(mqttMessage.payload.toString())
            this.songslists["tracklist"].forEach(element => {
              let song: Song = element as Song
              songs.push(song)
            })
          })
          return songs
    }

    pushTrack(trackID: Number){    
      this._mqttService.unsafePublish(
        "beatarea/v1/lms/user/"+localStorage.getItem("user-name")+"/command",
        JSON.stringify({
          "command" : "play",
          "parameters" : [trackID]
        }),
        {qos: 1, retain: false}
      )  
    }

    pauseTrack(){
      this._mqttService.unsafePublish(
        "beatarea/v1/lms/user/"+localStorage.getItem("user-name")+"/command",
        JSON.stringify({
          "command" : "pause"
        }),
        {qos: 1, retain: false}
      )  
    }

    registerUser(username: String){
      this._mqttService.unsafePublish(
        "beatarea/v1/$SYS/user/register",
        JSON.stringify({
          "user-name" : username
        }),
        {qos: 1, retain: false}
      )
      this.registerUserCallback()
    }

    registerUserCallback(){
      this.usercallbacksubscribtion = this._mqttService.observe('beatarea/v1/$SYS/user/register-callback').subscribe((mqttMessage: IMqttMessage) => {
        console.log(JSON.parse(mqttMessage.payload.toString()))
        localStorage.setItem("user-key", JSON.parse(mqttMessage.payload.toString())["user-key"])
        localStorage.setItem("user-name", JSON.parse(mqttMessage.payload.toString())["user-name"])      
      })
    }

    public getSongStatus(): number{
      return this.songtimestatus
    }

    public getTrackerValues(): String[]{
      
      return this.trackervalues
    }

    
}
//steal this bro: https://medium.com/javascript-everyday/singleton-made-easy-with-typescript-6ad55a7ba7ff