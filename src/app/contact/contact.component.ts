import { Message } from 'src/app/model/Message';
import { MessageService } from './../services/message.service';
import { Contact } from './../model/Contact';
import { LocalStorageService } from './../services/local-storage.service';
import { Conversation } from './../model/Conversation';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgIfContext } from '@angular/common';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styles: [],
})
export class ContactComponent implements OnInit, OnDestroy {
    @Input() selectedConversation: Conversation | any;
    @Output() selectedConversationChange = new EventEmitter<Conversation>();
    contacts: Conversation[] = [];
    user: Contact | any = {};
    private get_conversation_subscription: Subscription;
    private add_conversation_subscription: Subscription;
    private message_subscription: Subscription;
    private update_message_subscription: Subscription;

    constructor(private local: LocalStorageService, private messageService: MessageService) {
        this.get_conversation_subscription = new Subscription();
        this.add_conversation_subscription = new Subscription();
        this.message_subscription = new Subscription();
        this.update_message_subscription = new Subscription();
    }

    concernThisUser(convers: Conversation) {
        return convers.concern._id === this.user._id || convers.initer._id === this.user._id;
    }

    ngOnInit() {
        this.user = JSON.parse(this.local.get('user') || '{}');
        this.initGetConversationSocket();
        this.initAddConversationSocket();
        this.initMessagesConversationSocket();
        this.initUpdateMessagesConversationSocket();
        // First emition.
        this.messageService.getConversations();
    }

    initGetConversationSocket() {
        this.messageService.getConversations();
        this.get_conversation_subscription = this.messageService.get_conversations.subscribe({
            next: (data: any) => {
                if (data.user_id === this.user._id)
                    this.contacts = data.conversations.map((item: Conversation) => {
                        let messages = item.message;
                        return { ...item, message: messages, no_read: this.getNoRead(messages) };
                    });
            },
            error: (error) => {
                console.error(error.error);
            },
        });
    }

    initAddConversationSocket() {
        this.add_conversation_subscription = this.messageService.add_conversations.subscribe({
            next: (data) => {
                if (data.concern._id === this.user._id) {
                    this.contacts = [data, ...this.contacts];
                } else if (data.initer._id === this.user._id) {
                    this.contacts = [data, ...this.contacts];
                    this.setCurrent(data);
                }
            },
            error: (error) => {
                console.error(error.error);
            },
        });
    }

    initMessagesConversationSocket() {
        this.message_subscription = this.messageService.message.subscribe({
            next: (data) => {
                let conv = this.contacts.find((item) => item._id === data.id);
                if (conv) {
                    let messages = [...conv.message, data.message];
                    let new_conv = { ...conv, message: messages, no_read: this.getNoRead(messages) };
                    this.contacts = [new_conv, ...this.contacts.filter((item) => item._id !== data.id)];
                }
            },
            error: (error) => {
                console.error(error.error);
            },
        });
    }

    initUpdateMessagesConversationSocket() {
        this.message_subscription = this.messageService.update_message.subscribe({
            next: (data) => {
                this.contacts = this.contacts.map((item) => {
                    if (item._id === data._id) {
                        let messages = data.message;
                        return { ...data, message: messages, no_read: this.getNoRead(messages) };
                    }
                    return item;
                });
            },
            error: (error) => {
                console.error(error.error);
            },
        });
    }

    getNoRead(messages: Message[]) {
        let count: number = 0;
        messages.forEach((item) => {
            if (item.sender !== this.user._id && !item.is_read) count++;
        });
        return count;
    }

    ngOnDestroy(): void {
        this.get_conversation_subscription.unsubscribe();
        this.add_conversation_subscription.unsubscribe();
        this.message_subscription.unsubscribe();
        this.update_message_subscription.unsubscribe();
    }

    setCurrent(conv: Conversation) {
        this.selectedConversation = conv;
        this.selectedConversationChange.emit(this.selectedConversation);
        this.setAsRead(conv);
    }

    setAsRead(conv: Conversation) {
        if (conv.no_read > 0) {
            conv.message.forEach((item) => {
                if (!item.is_read && item._id && conv._id && item.sender !== this.user._id)
                    this.messageService.setAsRead({ message_id: item._id, conv_id: conv._id });
            });
        }
    }

    initNewConversation(conversation: Conversation) {
        this.messageService.addConversation(conversation);
    }
}
