import { User } from "./User";

export class Message {
    private sender;
    private reciever;
    private content;
    private image;
    private date;
    

    constructor(sender?:User,reciever?:User,content?:string,image?:string,date?:string){
        this.sender= sender;
        this.reciever= reciever;
        this.content = content;
        this.image = image;
        this.date= date
    }

    
    public get getsender() {
        return  this.sender
    }
    
    public get getreciever() {
        return this.reciever
    }
    
    public get getcontent() {
        return this.content
    }
    
    public get getimage() {
        return this.image
    }
    
    public get getdate() {
        return this.date
    }

    
    public set setsender(v : User) {
        this.sender = v;
    }

    
    public set setreciever(v : User) {
        this.reciever = v;
    }

    
    public set setcontent(v: any) {
        this.content = v;
    }

    
    public set setimage(v: any) {
        this.image = v;
    }

    
    public set setdate(v: any) {
        this.date= v;
    }
    

}
