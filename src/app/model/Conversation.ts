import { Message } from "./Message";
import { User } from "./User";

export class Conversation {
    private sender;
    private last_sms;
    private no_read;

    constructor(sender:User,last_sms:Message,no_read:number){
        this.sender = sender;
        this.last_sms=last_sms;
        this.no_read=no_read
    }

    
    public get getsender() : User {
        return  this.sender
    }
    
    public get getlast_sms() : Message {
        return this.last_sms
    }
    
    public get getno_read() : number {
        return this.no_read
    }
    
    
    public set setsender(v : User) {
        this.sender = v;
    }
    
    public set setlast_sms(v : Message) {
        this.last_sms = v;
    }
    
    public set setno_read(v : number) {
        this.no_read = v;
    }
    
    
    
    

}

