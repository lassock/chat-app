import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { ContactHeaderComponent } from './contact/hearder.component';
import { ConversationComponent } from './conversation/conversation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConversationHeaderComponent } from './conversation/header.component';
import { ContactItemComponent } from './contact/contact-item.component';
import { MessageComponent } from './conversation/message.component';

@NgModule({
  declarations: [		
    AppComponent,
      ContactComponent,
      ConversationComponent,
      ContactHeaderComponent,
      ConversationHeaderComponent,
      ContactItemComponent,
      MessageComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA  ]
})
export class AppModule { }
