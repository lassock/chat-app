import { Contact } from './../model/Contact';
import { Conversation } from './../model/Conversation';
import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    message: Observable<any>;
    update_message: Observable<any>;
    get_conversations: Observable<Conversation[]>;
    add_conversations: Observable<Conversation>;
    user: Contact;

    constructor(private localStorage: LocalStorageService, private socket: Socket) {
        this.user = JSON.parse(localStorage.get('user') || '{}');
        this.get_conversations = this.socket.fromEvent<Conversation[]>('get-conversations');
        this.add_conversations = this.socket.fromEvent<Conversation>('add-conversation');
        this.message = this.socket.fromEvent<any>('get-messages');
        this.update_message = this.socket.fromEvent<any>('update-message');
    }

    getConversations() {
        this.socket.emit('get-conversations', { id: this.user._id });
    }

    addConversation(data: Conversation) {
        this.socket.emit('add-conversation', data);
    }

    sendMessage(message: any) {
        this.socket.emit('add-message', message);
    }

    setAsRead(data: { message_id: string; conv_id: string }) {
        this.socket.emit('update-message', data);
    }
}
