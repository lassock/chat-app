import { Contact } from './Contact';
import { Message } from './Message';

export interface Conversation {
    _id?: string;
    initer: Contact;
    concern: Contact;
    message: Message[];
    no_read: number;
}
