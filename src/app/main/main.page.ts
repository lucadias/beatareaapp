import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'
import { Communicator } from '../services/communicator'
import { Song } from '../objects/song'

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  songs: Array<any>
  currentSong: String
  playStatus: String
  

  constructor(public navCtrl: NavController, public coo: Communicator) {
    this.currentSong = "-"
    this.playStatus = "Play"
    this.songs = coo.getSongListString()
  /*  this.songs = [
      {"name":"Smells Like Teen Spirit","artist":"Nirvana"},
      {"name":"One","artist":"U2"},
      {"name": "Bohemian Rhapsody","artist":"Quenn"},
      {"name": "Hey Jude","artist":"The Beatles"},
      {"name": "Like A Rolling Stone","artist":"Bob Dylan"},
      {"name": "I Can't Get No Satisfaction","artist":"Rolling Stones"},
      {"name": "Hero of War","artist":"Rise Against"},
      {"name": "bury a friend","artist":"Billie Eillish"},
      {"name": "Unsquare Dance","artist":"Dave Brubeck"},
      {"name":"Smells Like Teen Spirit","artist":"Nirvana"},
      {"name":"One","artist":"U2"},
      {"name": "Bohemian Rhapsody","artist":"Quenn"},
      {"name": "Hey Jude","artist":"The Beatles"},
      {"name": "Like A Rolling Stone","artist":"Bob Dylan"},
      {"name": "I Can't Get No Satisfaction","artist":"Rolling Stones"},
      {"name": "Hero of War","artist":"Rise Against"},
      {"name": "bury a friend","artist":"Billie Eillish"},
      {"name": "Unsquare Dance","artist":"Dave Brubeck"},
      {"name":"Smells Like Teen Spirit","artist":"Nirvana"},
      {"name":"One","artist":"U2"},
      {"name": "Bohemian Rhapsody","artist":"Quenn"},
      {"name": "Hey Jude","artist":"The Beatles"},
      {"name": "Like A Rolling Stone","artist":"Bob Dylan"},
      {"name": "I Can't Get No Satisfaction","artist":"Rolling Stones"},
      {"name": "Hero of War","artist":"Rise Against"},
      {"name": "bury a friend","artist":"Billie Eillish"},
      {"name": "Unsquare Dance","artist":"Dave Brubeck"},
      {"name":"Smells Like Teen Spirit","artist":"Nirvana"},
      {"name":"One","artist":"U2"},
      {"name": "Bohemian Rhapsody","artist":"Quenn"},
      {"name": "Hey Jude","artist":"The Beatles"},
      {"name": "Like A Rolling Stone","artist":"Bob Dylan"},
      {"name": "I Can't Get No Satisfaction","artist":"Rolling Stones"},
      {"name": "Hero of War","artist":"Rise Against"},
      {"name": "bury a friend","artist":"Billie Eillish"},
      {"name": "Unsquare Dance","artist":"Dave Brubeck"}
    ]*/
    
   }

  ngOnInit() {
  }

  playSong(song: Song){
    console.log(song.id)
    this.currentSong = song.title
    this.playStatus = "Pause"
    this.coo.pushTrack(song.id)
  }

  playNextSong(){
    console.log("sub")
  }

  playPauseButton(){
    if(this.playStatus === "Play"){  
      this.playStatus = "Pause"
    } else {
      this.playStatus = "Play"
    }
  }

  goToSettingsPage(){
    this.navCtrl.navigateForward('/settings')
  }

}
