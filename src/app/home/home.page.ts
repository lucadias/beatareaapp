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
  showIfNotFirstSlide: Boolean
  nextButtonText = "WEITER"
  username: String
  serveraddress: string
  constructor(public navCtrl: NavController, public coo: Communicator, public toastController: ToastController){
    this.showIfNotFirstSlide = true
    if(localStorage.getItem("mqttserver") != null){
      this.serveraddress = localStorage.getItem("mqttserver")
    }
   
  }

  goToNextSlide(){
    this.slides.getActiveIndex().then(result => {
      if(result == 2 || result == 1 && localStorage.getItem("user-key") != null){
        this.navCtrl.navigateRoot('/main')
      }
    })
    this.slides.slideNext()
    this.slideChanged()
  
    
  }

  goToPrevSlide(){
    this.slides.slidePrev();
    this.slideChanged();
  }

  slideChanged(){
    this.slides.getActiveIndex().then(result => {
      if(result == 0){
        this.showIfNotFirstSlide = false
      } else {
      this.showIfNotFirstSlide = true
      }
      if(result == 2){
        this.nextButtonText = "FERTIG"
      } else {
        this.nextButtonText = "WEITER"
      }
    })

  }

  loginUser(){
    this.coo.registerUser(this.username)
  }

  async setMQTTServer(serveraddress: string){
    localStorage.setItem("mqttserver", serveraddress)
    console.log(localStorage.getItem("mqttserver"))
    const toast = await this.toastController.create({
      message: 'Neue Serveraddresse gesetzt',
      duration: 1000
    })
    toast.present()
    this.goToNextSlide()
  }


}
