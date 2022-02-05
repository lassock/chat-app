import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core"

@Component({
    selector: 'app-contact-item',
    template: `<div (click)="handleClick()" class="transition {{selected ? 'bg-pink-50' : ''}} hover:bg-pink-50 cursor-default h-16 p-2 flex flex-row justify-between items-center border-b">
        <img class="h-12 w-12 rounded-full border border-pink-500" src="/assets/profile2.jpg" alt="Profile"/>      
        <div class="w-full text-base p-2">
            <div class="text-gray-800 text-lg whitespace-nowrap overflow-hidden text-ellipsis">Roncoder</div>
            <div class="text-gray-600 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Bonjour !</div>
        </div>
        <div class="flex flex-col justify-between items-center">
            <div class="text-gray-500 text-xs">12:00</div>
            <div class="h-5 w-5 bg-pink-400 rounded-full flex justify-center items-center    text-white p-1">2</div>
        </div>
    </div>`,
    styles: []
})
export class ContactItemComponent implements OnInit{
    @Input() selected: boolean = false;
    @Output() selectedChange = new EventEmitter()

    constructor(){}

    ngOnInit(): void {}

    handleClick(){
        this.selected = !this.selected;
        this.selectedChange.emit(this.selected)
    }
}