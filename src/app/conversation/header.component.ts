import { LocalStorageService } from './../services/local-storage.service';
import { Contact } from './../model/Contact';
import { Conversation } from './../model/Conversation';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-conversation-header',
    template: `<div class=" h-16 p-2 flex flex-row justify-between items-center">
        <div class="md:hidden">
            <button (click)="back.emit()" mat-icon-button class="mx-2 text-gray-500">
                <mat-icon>arrow_back</mat-icon>
            </button>
        </div>
        <img class="h-12 w-12 rounded-full border border-pink-500" src="/assets/profile2.jpg" alt="Profile2" />
        <div class="px-4 text-base text-gray-600 w-full">
            {{ contact_name }}
        </div>
    </div>`,
    styles: [],
})
export class ConversationHeaderComponent implements OnInit, OnChanges {
    @Input() conversation: Conversation | any = {};
    @Output() back = new EventEmitter();
    contact_name: string = '';
    user: Contact | any = {};

    constructor(private local: LocalStorageService) {}

    ngOnInit(): void {
        this.user = JSON.parse(this.local.get('user') || '{}');
        this.setData();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['conversation']) {
            this.setData();
        }
    }

    setData() {
        if (this.conversation === undefined) return;
        if (this.conversation._id) {
            let user =
                this.conversation.concern._id === this.user._id ? this.conversation.initer : this.conversation.concern;
            this.contact_name = user.first_name + ' ' + user.last_name;
        }
    }
}
