import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Music } from '../music';
import { MusicService } from '../music.service';
import { NgProgressService } from "ng2-progressbar";
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-music',
    templateUrl: './music.component.html',
    styleUrls: ['./music.component.css'],
})
export class MusicComponent implements OnInit {

    public listMusic: Music[];
    constructor(
        private musicService: MusicService,
        private title: Title,
        private processbar: NgProgressService
    ) {}
    ngOnInit() {
        // start process bar
        this.processbar.start();
        this.getMusic();
        this.setTitle();
    }
    // get music from music service
    getMusic() {
        this.musicService.getListMusic().subscribe((musics: Music[]) => {
            let listMusic = musics;
            this.listMusic = listMusic;
            this.processbar.done();
        })
    }
 
    // set title for page
    setTitle() {
        this.title.setTitle('Nhạc Việt');
    }

}
