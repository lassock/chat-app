import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { ContactHeaderComponent } from './contact/header/hearder.component';
import { ConversationComponent } from './conversation/conversation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConversationHeaderComponent } from './conversation/header.component';
import { ContactItemComponent } from './contact/contact-item.component';
import { MessageComponent } from './conversation/message/message.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatComponent } from './chat/chat.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';

import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { ModalContactsComponent } from './modal-contacts/modal-contacts.component';

const config: SocketIoConfig = { url: 'http://localhost:4000', options: {} };

@NgModule({
    declarations: [
        AppComponent,
        ContactComponent,
        ConversationComponent,
        ContactHeaderComponent,
        ConversationHeaderComponent,
        ContactItemComponent,
        MessageComponent,
        ChatComponent,
        SignInComponent,
        SignUpComponent,
        ModalContactsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        HttpClientModule,
        SocketIoModule.forRoot(config),
        // Material modules
        MatMenuModule,
        MatTabsModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatRippleModule,
        MatSidenavModule,
        MatCardModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatListModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
