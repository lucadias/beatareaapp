export interface Song{

    duration: number
    artist: string
    genre: string
    location: string
    id: number
    title: string

    /*constructor(paramJson: object){

        this.json = paramJson

        this.duration = this.json["duration"]
        this.artist = this.json["artist"]
        this.genre = this.json["location"]
        this.location = this.json["location"]
        this.id = this.json["id"]
        this.title = this.json["title"]
    }*/
}