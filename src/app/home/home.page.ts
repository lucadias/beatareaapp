import { Component } from '@angular/core'
import { ViewChild } from '@angular/core'
import { IonSlides, NavController } from '@ionic/angular'
import { Communicator } from '../services/communicator'
import { ToastController } from '@ionic/angular'

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
  userkey: String
  serveraddress: string
  public connectedToMQTT: Boolean = false

  constructor(public navCtrl: NavController, public coo: Communicator, public toastController: ToastController) {
    this.showIfLastSlide = false
    this.showIfSuccessfullRegister = false
    if (localStorage.getItem("mqttserver") != null) {
      this.serveraddress = localStorage.getItem("mqttserver")
    }
    this.username = localStorage.getItem("user-name")
    this.userkey = localStorage.getItem("user-key")
  }

  goToNextSlide() {
    this.slides.getActiveIndex().then(result => {
      if (result == 2 || result == 1 && localStorage.getItem("user-key") != null) {
        this.navCtrl.navigateRoot('/main')
      }
    })
    this.slides.slideNext()
    this.slideChanged()


  }

  goToPrevSlide() {
    this.slides.slidePrev();
    this.slideChanged();
  }

  slideChanged() {
    this.slides.getActiveIndex().then(result => {
      if (result == 2) {
        this.connectToMQTT()
      }
    })

  }

  loginUser() {
    this.coo.registerUser(this.username)

  }

  setMQTTServer(serveraddress: string) {

    localStorage.setItem("mqttserver", serveraddress)

    this.connectToMQTT()

    this.goToNextSlide()

  }

  connectToMQTT() {
    if (!this.connectedToMQTT) {
      this.coo.init()
      this.connectedToMQTT = true
    }
  }
}
