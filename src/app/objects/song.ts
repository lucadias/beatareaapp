export class Song{
    
    public json: object

    public id: number
    public name: string

    constructor(paramJson: object){

        this.json = paramJson

        this.id = this.json["id"]
        this.name = this.json["name"]
    }
}