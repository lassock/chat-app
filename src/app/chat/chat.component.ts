import { Conversation } from './../model/Conversation';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
    tab_index: number = 0;
    selectedConversation: Conversation | any;

    constructor() {}

    ngOnInit() {}

    onSelectedConversationChange(current: Conversation) {
        this.selectedConversation = current;
        this.tab_index = 1;
    }

    onBack() {
        this.tab_index = 0;
        this.selectedConversation = {};
    }
}
