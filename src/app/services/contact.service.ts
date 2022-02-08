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

    constructor(private http: HttpClient) {}

    getContacts() {
        return this.http.get<any[]>(this.uri, { headers: this.headers });
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
