import { User } from "./User";

export interface Message {
    _id?: string;
    sender: string;
    content: string;
    send_at: Date;
    is_read: boolean;
}
