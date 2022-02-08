import { Subscription } from 'rxjs';
import { Contact } from './../model/Contact';
import { LocalStorageService } from './../services/local-storage.service';
import { MessageService } from './../services/message.service';
import { Conversation } from './../model/Conversation';
import {
    AfterViewInit,
    Component,
    Input,
    OnInit,
    ViewChild,
    OnDestroy,
    EventEmitter,
    Output,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { Message } from '../model/Message';

@Component({
    selector: 'app-conversation',
    templateUrl: './conversation.component.html',
    styles: [],
})
export class ConversationComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
    @Input() selectedConversation: Conversation | any = {};
    @Output() back = new EventEmitter();
    messages: Message[] = [];
    message: string = '';
    user: Contact | any = {};
    @ViewChild('input_message') input_message: any;
    @ViewChild('conversation_content') conversation_content: any;
    private message_subscription: Subscription;

    constructor(private messageService: MessageService, private local: LocalStorageService) {
        this.message_subscription = new Subscription();
    }

    ngOnInit() {
        this.user = JSON.parse(this.local.get('user') || '{}');
        this.message_subscription = this.messageService.message.subscribe({
            next: (data) => {
                if (data && this.selectedConversation) {
                    if (data.id === this.selectedConversation._id) {
                        if (this.messages.find((item) => item._id === data.message._id) === undefined) {
                            this.messages.push(data.message);
                            if (this.user._id !== data.message.sender) {
                                this.messageService.setAsRead({
                                    message_id: data.message._id,
                                    conv_id: this.selectedConversation._id,
                                });
                            }
                        }
                    }
                }
                setTimeout(() => {
                    this.scrollTo();
                }, 200);
            },
            error: (error) => {
                console.error(error.error);
            },
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['selectedConversation']) {
            if (this.selectedConversation) {
                this.messages = this.selectedConversation.message || [];
                this.messages.forEach((item) => {
                    setTimeout(() => {
                        this.scrollTo();
                    }, 200);
                });
            }
        }
    }

    ngOnDestroy(): void {
        this.message_subscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        let input = this.input_message.nativeElement;
        if (input) {
            input.focus();
            input.addEventListener('keypress', (e: any) => {
                if (e.key == 'Enter') {
                    this.sendMessage();
                }
            });
        }
    }

    sendMessage() {
        let message: Message = {
            sender: this.user._id,
            content: this.message,
            send_at: new Date(),
            is_read: false,
        };
        this.messageService.sendMessage({ id: this.selectedConversation._id, message: message });
        this.message = '';
    }

    getDate(date: Date) {
        return date.toLocaleDateString('fr').split('/').reverse().join('-') + ' ' + date.toLocaleTimeString('fr');
    }

    scrollTo() {
        if (this.conversation_content) {
            let content = this.conversation_content.nativeElement;
            if (content) content.scrollTo({ top: content.scrollHeight });
        }
    }
}
