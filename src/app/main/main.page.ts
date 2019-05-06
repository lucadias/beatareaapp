import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'
import { Communicator } from '../services/communicator'
import { Song } from '../objects/song'

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  songs: Array<Song>
  currentSong: string
  playStatus: string
  indexActiveSong: number
  

  constructor(public navCtrl: NavController, public coo: Communicator) {
    this.currentSong = "-"
    this.playStatus = "Play"
    this.songs = coo.getSongListString()
  }

   
  ngOnInit() {
  }

  playSong(song: Song){
    this.currentSong = song.title
    this.playStatus = "Pause"
    this.coo.pushTrack(song.id)
    this.indexActiveSong = this.songs.findIndex((searchsong) => {return searchsong.id == song.id})
  }

 

  playNextSong(){
    this.indexActiveSong = this.indexActiveSong < this.songs.length ? this.indexActiveSong+1 : 0
    this.playSong(this.songs[this.indexActiveSong])
  }

  playPrevSong(){
    this.indexActiveSong = this.indexActiveSong < this.songs.length ? this.indexActiveSong-1 : 0
    this.playSong(this.songs[this.indexActiveSong])
  }

  playPauseButton(){
    this.coo.pauseTrack()
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
