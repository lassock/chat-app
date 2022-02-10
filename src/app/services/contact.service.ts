import { LocalStorageService } from './local-storage.service';
import { Contact } from './../model/Contact';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ContactService {
    uri: string = 'http://127.0.0.1:4000/contact';
    headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });
    user: Contact = { first_name: '', last_name: '', username: '', password: '', token: '' };

    constructor(private http: HttpClient, private local: LocalStorageService) {
        this.user = JSON.parse(this.local.get('user') || '{}');
    }

    getContacts() {
        const token = this.user.token;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        });
        return this.http.get<any[]>(this.uri, { headers: headers });
    }

    addContact(contact: Contact) {
        return this.http.post(this.uri, contact, { headers: this.headers });
    }

    login(username: string, password: string) {
        return this.http.get(this.uri + '/login?username=' + username + '&password=' + password, {
            headers: this.headers,
        });
    }
}
