import { Router } from '@angular/router';
import { LocalStorageService } from './../services/local-storage.service';
import { ContactService } from './../services/contact.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
    username: string = '';
    password: string = '';
    message: string = '';

    constructor(private contactServices: ContactService, private local: LocalStorageService, private router: Router) {}

    ngOnInit() {}

    validate(): boolean {
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
            this.contactServices.login(this.username, this.password).subscribe({
                next: (contact: any) => {
                    if (contact !== null) {
                        this.local.set('user', JSON.stringify(contact));
                        this.router.navigate(['/chat']);
                    } else {
                        this.message = "Your username or password isn't correct";
                    }
                },
                error: (error) => {
                    console.error(error);
                    this.message = error.message;
                },
            });
        }
    }
}
