import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styles: []
})
export class ContactComponent implements OnInit{
  contacts: any[] = []
  current:number = -1

  constructor() { }

  ngOnInit() {
    this.contacts =[
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ]
  }

  setCurrent(index: number){
    this.current = index;
  }

}
