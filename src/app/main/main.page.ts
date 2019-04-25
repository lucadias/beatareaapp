import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  songs: Array<any>
  currentSong: String
  playStatus: String

  constructor() {
    this.currentSong = "-"
    this.playStatus = "Play"
    this.songs = [
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
    ]
    
   }

  ngOnInit() {
  }

  playSong(song: any){
    console.log(song.name)
    this.currentSong = song.name
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

}
