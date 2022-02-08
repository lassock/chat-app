import { LocalStorageService } from './../services/local-storage.service';
import { ContactService } from './../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from '../model/Contact';

@Component({
    selector: 'app-modal-contacts',
    templateUrl: './modal-contacts.component.html',
    styleUrls: ['./modal-contacts.component.scss'],
})
export class ModalContactsComponent implements OnInit {
    contacts: Contact[] = [];

    constructor(private contactService: ContactService, private local: LocalStorageService) {}

    ngOnInit() {
        let user = JSON.parse(this.local.get('user') || '{}');
        this.contactService.getContacts().subscribe((contacts) => {
            this.contacts = contacts.filter((item) => item._id !== user._id);
        });
    }
}
