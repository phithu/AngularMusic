import { Component, OnInit, Input } from '@angular/core';
import { Music } from '../music';

@Component({
    selector: 'app-list-song',
    templateUrl: './list-song.component.html',
    styleUrls: ['./list-song.component.css']
})
export class ListSongComponent implements OnInit {

    @Input("listMusic") listMusic: Music[];
    @Input("isDouble") isDouble: boolean = false;
    constructor() { }

    ngOnInit() {
    }

}
