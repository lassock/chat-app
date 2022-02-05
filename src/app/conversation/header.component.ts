import {Component, OnInit} from "@angular/core"

@Component({
    selector: 'app-conversation-header',
    template: `<div class="h-16 p-2 flex flex-row justify-between items-center">
        <img class="h-12 w-12 rounded-full border border-pink-500" src="/assets/profile2.jpg" alt="Profile2"/>      
        <div class="px-4 text-base text-gray-600 w-full">Roncoder</div>
    </div>`,
    styles: []
})
export class ConversationHeaderComponent implements OnInit{
    constructor(){}

    ngOnInit(): void {}
}