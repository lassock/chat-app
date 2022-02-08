import { Contact } from './../../model/Contact';
import { LocalStorageService } from './../../services/local-storage.service';
import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../model/Message';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styles: [],
})
export class MessageComponent implements OnInit {
    @Input() message: Message | any = {};
    user: Contact | any = {};
    is_recieved: boolean = false;
    date: string = '';

    constructor(private local: LocalStorageService) {}

    ngOnInit(): void {
        this.user = JSON.parse(this.local.get('user') || '{}');
        this.is_recieved = this.message.sender !== this.user._id;
        this.date =
            new Date(this.message.send_at).toLocaleDateString('fr') +
            ' at ' +
            new Date(this.message.send_at).toLocaleTimeString('fr').substring(0, 5);
    }
}
