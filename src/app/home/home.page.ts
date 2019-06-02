import { Component } from '@angular/core'
import { ViewChild } from '@angular/core'
import { IonSlides, NavController } from '@ionic/angular'
import { Communicator } from '../services/communicator'
import { ToastController } from '@ionic/angular'
import { Device } from '../objects/device'
import { interval } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //variables
  @ViewChild(IonSlides) slides: IonSlides
  //
  showIfLastSlide: Boolean
  showIfSuccessfullRegister: Boolean
  username: String
  storageusername: String
  userkey: String
  serveraddress: string
  public connectedToMQTT: Boolean = false
  devices: Array<Device>
  devicetoTrack: String
  skipUserLoginScreen: Boolean
  automaticUserMQTTLoggedInBool: Boolean
  losButtonDisabled: Boolean

  constructor(public navCtrl: NavController, public coo: Communicator, public toastController: ToastController) {
    this.showIfLastSlide = false
    this.showIfSuccessfullRegister = false
    this.skipUserLoginScreen = true
    this.automaticUserMQTTLoggedInBool = false


    
    if (localStorage.getItem("mqttserver") != null) {
      this.serveraddress = localStorage.getItem("mqttserver")
    }
    this.storageusername = localStorage.getItem("user-name")
    this.userkey = localStorage.getItem("user-key")
  }

  goToNextSlide() {
      this.slides.getActiveIndex().then(result => {
      if (result == 3) {
        this.navCtrl.navigateRoot('/main')
      } else if (result == 2 && localStorage.getItem("user-key") != undefined && localStorage.getItem("skipuserlogin") === "true") {
        this.navCtrl.navigateRoot('/main')
      } else {
        this.slides.slideNext()
        this.slideChanged()
      }
    })



  }

  resetLocalStorage() {
    localStorage.clear()
    this.storageusername = ""
    this.userkey = ""
  }

  goToPrevSlide() {
    this.slides.slidePrev();
    this.slideChanged();
  }

  slideChanged() {
    this.slides.lockSwipes(false)
    this.slides.getActiveIndex().then(result => {

      if (result == 2) {
        this.connectToMQTT()
        if (this.devicetoTrack == null) {
          this.slides.lockSwipeToNext(true)
        }
      }
      if (result == 1 && localStorage.getItem("mqttserver") == null) {
        this.slides.lockSwipes(true)
      }
      if(result == 3 && !this.automaticUserMQTTLoggedInBool && localStorage.getItem("user-key") != null){
        this.automaticUserMQTTLoggedInBool = true
        this.coo.automaticUserLogin()
      }
      if (result == 3){
        if (localStorage.getItem("registration-success") == "true") {
          this.losButtonDisabled = false
        } else {
          this.losButtonDisabled = true
        }
       
      }

    })

  }

  loginUser() {
    this.coo.registerUser(this.username, this.devicetoTrack)
    interval(500).subscribe(() => {
      if (localStorage.getItem("registration-success") == "false") {
        this.storageusername = "Fehler"
        this.userkey = "Benutzername nicht verfügbar"
        this.losButtonDisabled = true
      } else {
        this.storageusername = localStorage.getItem("user-name")
        this.userkey = localStorage.getItem("user-key")
        this.losButtonDisabled = false
      }
    })
  }

  setMQTTServer(serveraddress: string) {
    localStorage.setItem("mqttserver", serveraddress)
    //this.connectToMQTT()
    this.slides.lockSwipes(false)
    this.goToNextSlide()

  }

  connectToMQTT() {
    if (!this.connectedToMQTT) {
      this.coo.init()

      this.connectedToMQTT = true
    }
    this.devices = this.coo.getTrackingDevicesList()

  }

  setAvailableDevices(devicemac: String) {
    console.log(devicemac)
    this.slides.lockSwipes(false)
    this.devicetoTrack = devicemac
    this.goToNextSlide()
  }

  automaticUserLogin(e: any) {
    console.log(this.skipUserLoginScreen)
    localStorage.setItem("skipuserlogin", JSON.stringify(this.skipUserLoginScreen))
  }
}
