export class User {
    private username :string;
    private password :string;

    constructor(username:string,password:string){
        this.username = username;
        this.password = password
    }

    
    public get getusername() : string {
        return this.username
    }
    
    public get getpassword() : string {
        return  this.password
    }
    
    public set setusername(v : string) {
        this.username = v;
    }

    
    public set setpassword(v : string) {
        this.password = v;
    }
    
    
    
    
}

