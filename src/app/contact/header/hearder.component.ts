import { Conversation } from './../../model/Conversation';
import { Contact } from './../../model/Contact';
import { LocalStorageService } from './../../services/local-storage.service';
import { ModalContactsComponent } from './../../modal-contacts/modal-contacts.component';
import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Message } from 'src/app/model/Message';

@Component({
    selector: 'app-contact-header',
    templateUrl: './header.component.html',
    styles: [],
})
export class ContactHeaderComponent implements OnInit, AfterViewInit {
    @Output() newConversation = new EventEmitter<Conversation>();
    @ViewChild('custom_input_elt') custom_input_elt: any;
    show_search: boolean = false;
    search_value: string = '';
    user: Contact | any;

    constructor(private modal: MatDialog, private local: LocalStorageService) {}

    ngOnInit(): void {
        this.user = JSON.parse(this.local.get('user') || '{}');
    }

    ngAfterViewInit(): void {
        this.custom_input_elt.nativeElement;
    }

    showSearch() {
        this.custom_input_elt.nativeElement.focus();
        this.show_search = true;
    }

    openContacts() {
        this.modal
            .open(ModalContactsComponent)
            .afterClosed()
            .subscribe((concern) => {
                if (concern) {
                    if (concern._id) {
                        let conversation: Conversation = {
                            initer: this.user,
                            concern: concern,
                            message: [],
                            no_read: 0,
                        };
                        this.newConversation.emit(conversation);
                    }
                }
            });
    }
}
