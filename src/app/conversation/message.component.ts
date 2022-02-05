import {Component, Input, OnInit} from "@angular/core"
import { Message } from "../model/Message";

@Component({
    selector: 'app-message',
    template: `<div class="flex flex-row items-center p-2 {{recieved ? ' justify-start' : ' justify-end'}}">
        <div class="{{recieved ? 'bg-pink-400 text-white' : 'bg-gray-400 text-black'}} text-base px-2 py-1 rounded">{{message.getcontent}}</div>
    </div>`,
    styles: []
})
export class MessageComponent implements OnInit{
    @Input() message : Message = new Message();
    recieved: boolean = false;

    constructor(){}

    ngOnInit(): void {
        this.recieved = this.message.getsender !== undefined
    }
}