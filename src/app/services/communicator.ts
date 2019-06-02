import { Injectable } from '@angular/core'
import { IMqttMessage, MqttService } from 'ngx-mqtt'
import { Song } from '../objects/song'
import { Device } from '../objects/device'

@Injectable()
export class Communicator {

  private songlistsubscribtion: any
  private usercallbacksubscribtion: any
  private songstatussubscribtion: any
  private trackingdevicessubsscribtion: any
  public songslists: string
  public trackerdeviceslist: string
  public songtimestatus: number
  public registerUserAnswer: Boolean
  private trackingDevices: Array<Device> = []
  public masterVolume: number
  public currentsonglength: number

  private alreadyConnectedToMQTT: Boolean = false

  private songs: Array<Song> = []

  constructor(public _mqttService: MqttService) {

  }

  public init() {
    if (!this.alreadyConnectedToMQTT) {
      this.alreadyConnectedToMQTT = true
      console.log("connect mqtt")
      this._mqttService.connect({ hostname: localStorage.getItem("mqttserver") })

      this.songstatussubscribtion = this._mqttService.observe('beatarea/v1/$SYS/user/'+localStorage.getItem('user-name')+'/status').subscribe((mqttMessage: IMqttMessage) => {
        this.songtimestatus = JSON.parse(mqttMessage.payload.toString())["time"]
        this.masterVolume = JSON.parse(mqttMessage.payload.toString())["volume"]
        this.currentsonglength
      })



      this.songlistsubscribtion = this._mqttService.observe('beatarea/v1/lms/media/tracks').subscribe((mqttMessage: IMqttMessage) => {
        this.songs = []
        console.log(this.songs)
        this.songslists = JSON.parse(mqttMessage.payload.toString())
        this.songslists["tracklist"].forEach(element => {
          let song: Song = element as Song
          this.songs.push(song)
        })
      })

      this.trackingdevicessubsscribtion = this._mqttService.observe('beatarea/v1/tracker').subscribe((mqttMessage: IMqttMessage) => {
        this.trackerdeviceslist = JSON.parse(mqttMessage.payload.toString())
        console.log(this.trackerdeviceslist)
        this.trackerdeviceslist["availableDevices"].forEach(element => {
          let device: Device = element as Device
          this.trackingDevices.push(device)
        })
      })
    }
  }

  public getTrackingDevicesList(): Array<Device> {
    //console.log(this.trackingDevices)
    return this.trackingDevices
  }
  public getSongListString(): Array<Song> {
    return this.songs
  }

  pushTrack(trackID: Number) {
    this._mqttService.unsafePublish(
      "beatarea/v1/lms/user/" + localStorage.getItem("user-name") + "/command",
      JSON.stringify({
        "command": "play",
        "parameters": [trackID]
      }),
      { qos: 1, retain: false }
    )
  }

  pauseTrack() {
    this._mqttService.unsafePublish(
      "beatarea/v1/lms/user/" + localStorage.getItem("user-name") + "/command",
      JSON.stringify({
        "command": "pause"
      }),
      { qos: 1, retain: false }
    )
  }

  volumeUp() {
    this.masterVolume -= 10
    this.setMasterVolume()
  }
  volumeDown() {
    this.masterVolume += 10
    this.setMasterVolume()
  }

  setMasterVolume() {
    this._mqttService.unsafePublish(
      "beatarea/v1/lms/user/" + localStorage.getItem("user-name") + "/command",
      JSON.stringify({
        "command": "volume",
        "parameters": [this.masterVolume]
      }),
      { qos: 1, retain: false }
    )
  }

  registerUser(username: String, deviceToTrack: String) {
    this.registerUserCallback()
    this._mqttService.unsafePublish(
      "beatarea/v1/$SYS/user/register",
      JSON.stringify({
        "user-name": username,
        "device": deviceToTrack
      }),
      { qos: 1, retain: false }
    )

  }

  automaticUserLogin() {
    this.registerUserCallback()
    this._mqttService.unsafePublish(
      "beatarea/v1/$SYS/user/register",
      JSON.stringify({
        "user-name": localStorage.getItem("user-name"),
        "user-key": localStorage.getItem("user-key")
      }),
      { qos: 1, retain: false }
    )
  }

  registerUserCallback() {
    this.usercallbacksubscribtion = this._mqttService.observe('beatarea/v1/$SYS/user/register-callback').subscribe((mqttMessage: IMqttMessage) => {
      console.log(JSON.parse(mqttMessage.payload.toString()))
      console.log(JSON.parse(mqttMessage.payload.toString())["user-key"])
      console.log("json mit user key" + JSON.parse(mqttMessage.payload.toString()).hasOwnProperty('user-key'))
      if (JSON.parse(mqttMessage.payload.toString())["registration-success"] === 'true' && !JSON.parse(mqttMessage.payload.toString()).hasOwnProperty('user-key')) {
        console.log("yo bisch hie rein cho")
      } else {
        localStorage.setItem("user-key", JSON.parse(mqttMessage.payload.toString())["user-key"])

      }
      localStorage.setItem("registration-success", JSON.parse(mqttMessage.payload.toString())["registration-success"])
      localStorage.setItem("user-name", JSON.parse(mqttMessage.payload.toString())["user-name"])
      this.usercallbacksubscribtion.unsubscribe()
    })
  }


  public getSongStatus(): number {
    return this.songtimestatus
  }

  public getCurrontSongLength(): number {
    return this.currentsonglength
  }



}
//steal this bro: https://medium.com/javascript-everyday/singleton-made-easy-with-typescript-6ad55a7ba7ff