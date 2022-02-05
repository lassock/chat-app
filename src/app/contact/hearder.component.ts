import {Component, OnInit} from "@angular/core"

@Component({
    selector: 'app-contact-header',
    template: `<div class="h-16 p-2 flex flex-row justify-between items-center">
        <button *ngIf="show_search" (click)="show_search = false" mat-icon-button class="mx-2 text-gray-500"> 
            <mat-icon>arrow_back</mat-icon>
        </button>
        <img *ngIf="!show_search" class="h-12 w-12 rounded-full border border-pink-500" src="/assets/profile.jpg" alt="Profile"/>      
        <input *ngIf="show_search" [(ngModel)]="search_value" class="w-full text-base text-gray-700 p-2" placeholder="Search contact.."/>
        <div *ngIf="!show_search" class="px-4 text-base text-gray-600 w-full">Junisse Lassock</div>
        <button *ngIf="!show_search" (click)="show_search = true" mat-icon-button class="mx-2 text-gray-500"> 
            <mat-icon>search</mat-icon>
        </button>
    </div>`,
    styles: []
})
export class ContactHeaderComponent implements OnInit{
    show_search: boolean = false;
    search_value: string = ''

    constructor(){}

    ngOnInit(): void {}
}