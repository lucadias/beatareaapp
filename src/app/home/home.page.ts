import { Component } from '@angular/core'
import { ViewChild } from '@angular/core'
import { IonSlides, NavController } from '@ionic/angular'
import { Communicator } from '../services/communicator'

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
  constructor(public navCtrl: NavController, public coo: Communicator){
    this.showIfNotFirstSlide = true
    
   
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


}
