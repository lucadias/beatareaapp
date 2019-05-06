export class Song{
    
    public json: object

    public duration: number
    public artist: string
    public genre: string
    public location: string
    public id: number
    public title: string

    constructor(paramJson: object){

        this.json = paramJson

        this.duration = this.json["duration"]
        this.artist = this.json["artist"]
        this.genre = this.json["location"]
        this.location = this.json["location"]
        this.id = this.json["id"]
        this.title = this.json["title"]
    }
}