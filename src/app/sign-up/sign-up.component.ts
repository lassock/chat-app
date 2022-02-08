import { Contact } from './../model/Contact';
import { LocalStorageService } from './../services/local-storage.service';
import { ContactService } from './../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
    lastname: string = '';
    firstname: string = '';
    username: string = '';
    password: string = '';
    message: string = '';

    constructor(private contactServices: ContactService, private local: LocalStorageService, private router: Router) {}

    ngOnInit() {}

    validate(): boolean {
        if (this.lastname.trim() === '') {
            this.message = 'Please set your Last name.';
            return false;
        }
        if (this.firstname.trim() === '') {
            this.message = 'Please set your First name.';
            return false;
        }
        if (this.username.trim() === '') {
            this.message = 'Please set your Username.';
            return false;
        }
        if (this.password.trim() === '') {
            this.message = 'Please set your password.';
            return false;
        }
        return true;
    }

    submit() {
        if (this.validate()) {
            let contact_: Contact = {
                first_name: this.firstname,
                last_name: this.lastname,
                username: this.username,
                password: this.password,
            };
            this.contactServices.addContact(contact_).subscribe({
                next: (contact: any) => {
                    this.local.set('user', JSON.stringify(contact));
                    this.router.navigate(['/chat']);
                },
                error: (error) => {
                    console.error(error);
                    this.message = error.message;
                },
            });
        }
    }
}
