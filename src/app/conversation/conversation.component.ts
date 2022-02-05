import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from '../model/Message';
import { User } from '../model/User';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styles: []
})
export class ConversationComponent implements OnInit, AfterViewInit {
  messages: Message[] = []
  message: string = '';
  @ViewChild('input_message') input_message: any;
  @ViewChild('conversation_content') conversation_content : any;

  constructor() { }

  ngOnInit() {
    this.messages =[
      new Message(new User('', ''), undefined, 'Bonjour mon ange!'),
      new Message(undefined, undefined, 'Salut !'),
      new Message(new User('', ''), undefined, 'Comment tu vas ?'),
      new Message(undefined, undefined, 'Je vais bien'),
      new Message(undefined, undefined, 'Et toi ?'),
      new Message(new User('', ''), undefined, 'Moi aussi je vais bien!')
    ]
  }

  ngAfterViewInit(): void {
    let input = this.input_message.nativeElement
    if(input){
      input.focus()
      input.addEventListener('keypress', (e: any) => {
          if(e.key == 'Enter'){
            this.sendMessage()
          }
      })
    }
  }

  sendMessage(){
    this.messages.push(new Message(undefined, undefined, this.message))
    this.message = ''
    setTimeout(() => {
      this.scrollTo() 
    }, 200);
  }

  scrollTo(){
    if(this.conversation_content){
      let content =  this.conversation_content.nativeElement
      if(content)
      content.scrollTo({top: content.scrollHeight})
      console.log(content)
    }
  }

}
