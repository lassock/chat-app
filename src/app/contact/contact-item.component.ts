import { Contact } from './../model/Contact';
import { LocalStorageService } from './../services/local-storage.service';
import { Conversation } from './../model/Conversation';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-contact-item',
    template: `<div
        (click)="handleClick()"
        class="transition {{
            selected ? 'bg-pink-50' : ''
        }} hover:bg-pink-50 cursor-default h-16 p-2 flex flex-row justify-between items-center border-b"
    >
        <img class="h-12 w-12 rounded-full border border-pink-500" src="/assets/profile2.jpg" alt="Profile" />
        <div class="w-full text-base p-2">
            <div class="text-gray-800 text-lg whitespace-nowrap overflow-hidden text-ellipsis">
                {{ contact_name }}
            </div>
            <div class="text-gray-600 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                {{ message }}
            </div>
        </div>
        <div class="flex flex-col justify-between items-center">
            <div class="text-gray-500 text-xs">{{ time }}</div>
            <div
                class="h-5 w-5 bg-pink-400 rounded-full flex justify-center items-center  {{
                    conversation.no_read > 0 ? '' : 'invisible'
                }}  text-white p-1"
            >
                {{ conversation.no_read }}
            </div>
        </div>
    </div>`,
    styles: [],
})
export class ContactItemComponent implements OnInit {
    @Input() selected: boolean = false;
    @Input() conversation: Conversation | any = {};
    @Output() selectedChange = new EventEmitter();
    time: string = '';
    message: string = '';
    contact_name: string = '';
    user: Contact | any = {};

    constructor(private local: LocalStorageService) {}

    ngOnInit(): void {
        this.user = JSON.parse(this.local.get('user') || '{}');
        if (this.conversation._id) {
            let user =
                this.conversation.concern._id === this.user._id ? this.conversation.initer : this.conversation.concern;
            this.contact_name = user.first_name + ' ' + user.last_name;
            let messages = this.conversation.message;
            if (messages.length > 0) {
                let message = messages[messages.length - 1];
                this.message = message.content;
                this.time = new Date(message.send_at).toLocaleTimeString('fr').substring(0, 5);
            }
        }
    }

    handleClick() {
        this.selectedChange.emit(this.conversation);
    }
}
