import { ActivatedRoute, Params, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {
    AfterViewChecked,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    enableProdMode,
    animate,
    style,
    trigger,
    state,
    transition
} from '@angular/core';
import { Music } from '../music';
import { MusicService } from './../music.service';
import { NgProgressService } from 'ng2-progressbar';
import { Song } from './../song';
import { PlayerComponent } from '../player/player.component';
import { ListSongComponent } from '../list-song/list-song.component';

enableProdMode()
@Component({
    selector: 'app-music-detail',
    templateUrl: './music-detail.component.html',
    styleUrls: ['./music-detail.component.css'],
    animations: [
        trigger('flyInfoSong', [
            state('flyIn', style(
                {
                    transform: 'scale(1)',
                    opacity: 1,
                    display: 'block'
                }
            )),
            state('flyOut', style(
                {
                    transform: 'scale(1.02)',
                    opacity: 0,
                    display: 'none'
                }
            )),
            transition("flyOut <=> flyIn", animate(400)),
        ]),
        trigger('flyListMusic', [
            state('flyIn', style(
                {
                    transform: 'scale(1)',
                    opacity: 1,
                    display: 'block'
                }
            )),
            state('flyOut', style(
                {
                    transform: 'scale(0.97)',
                    opacity: 0,
                    display: 'none'
                }
            )),
            transition("flyOut <=> flyIn", animate(500)),
        ]
        )
    ]
})
export class MusicDetailComponent implements OnInit, AfterViewChecked {

    @ViewChild(PlayerComponent)
    private playerComponent: PlayerComponent;
    @ViewChild("tabFirst") tabFirst: ElementRef;
    private id: string;
    public song: any;
    public lyricSong: Array<string>;
    private loaded: boolean = false;
    public listMusic: Music[];
    public listMusicSameSinger: Music[];
    private toggle: boolean = true;
    private toggleResponsive: boolean = true;
    public stateInfoSong: string = "flyIn";
    public stateListMusic: string = "flyOut";

    constructor(
        private musicService: MusicService,
        private activatedRouter: ActivatedRoute,
        private processbar: NgProgressService,
        private title: Title,
        private router: Router
    ) { }

    ngOnInit() {
        this.processbar.start();
        this.getlistMusic();
    }
    ngAfterViewChecked() {
        if (this.playerComponent && !this.loaded) {
            this.playerComponent.player.nativeElement.play();
            this.loaded = true;
        }
    }
    // get id above router
    getParamsId() {
        this.activatedRouter.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                this.id = id;
                if(this.checkIdExist()) {
                    this.getSingleSong();
                }
                else {
                    this.processbar.done();
                }
            }
        )
        console.clear();
    }
    checkIdExist(): boolean {
        for (let i = 0; i < this.listMusic.length; i++) {
            if(this.listMusic[i].id === this.id) {
                return true;
            }
        }
        return false;
    }
    // get single song from music service
    getSingleSong() {
        // start processbar
        this.processbar.start();
        // get song from music service
        this.musicService.getSong(this.id).subscribe(
            (valueSong: any) => {
                let mysong = valueSong;
                this.song = mysong;
                if (typeof this.playerComponent !== 'undefined') {
                    this.playerComponent.player.nativeElement.load()
                }
            },
            // Error
            (error) => {
                console.log("Error: ", error)
            },
            // Complete
            () => {
                // set Title for page
                this.setTitle();
                this.song.album_cover = this.getImagesAlbum(this.id, this.listMusic);
                this.song.lyric = this.getSourceLyric(this.id, this.listMusic)
                // get Lyris's song
                this.formatLyric();
                this.listMusicSameSinger = this.getSongSameSinger(this.song.artist, this.id);
                this.processbar.done();
            }
        );
    }
    getSongSameSinger(artist: string, idSong: string): Music[] {
        let arrayFiler = this.listMusic;
        return arrayFiler.filter((Music: Music) => {
            if (artist.toLowerCase() === Music.artist.toLowerCase() && idSong !== Music.id) {
                return arrayFiler;
            }
        });

    }
    // get list music
    getlistMusic() {
        this.musicService.getListMusic().subscribe(
            (s_listMusic: any) => {
                let listmusic = s_listMusic;
                this.listMusic = listmusic;
            },
            (error) => {
                console.log('Error: ', error)
            },
            () => {
                this.getParamsId();
            })
    }
    // get images album
    getImagesAlbum(id: string, listMusic: Music[]): string {
        for (let i = 0; i < listMusic.length; i++) {
            if (listMusic[i].id === id) {
                return listMusic[i].cover;
            }
        }
    }
    // get lyric song
    getSourceLyric(id: string, listMusic: Music[]): string {
        for (let i = 0; i < listMusic.length; i++) {
            if (listMusic[i].id === id) {
                return listMusic[i].lyric;
            }
        }
    }
    formatLyric() {
        this.lyricSong = [];
        this.musicService.getLyric(this.song.lyric).subscribe((value: string) => {
            let tempstring1: string = value;
            let arrayLyric = tempstring1.split(/(\n)/);
            for (let i = 0; i < arrayLyric.length; i++) {
                arrayLyric[i] = arrayLyric[i].slice(10);
                if (arrayLyric[i].search("Ca sĩ:") !== -1 || arrayLyric[i].search("Ca Sĩ:") !== -1) {
                    arrayLyric[i] = "";
                }
                if (arrayLyric[i] !== "") {
                    this.lyricSong.push(arrayLyric[i]);
                }
            }
            this.lyricSong.splice(0, 7);
        });
    }
    // set title for page
    setTitle() {
        this.title.setTitle('Music | ' + this.song.title);
    }
    toggleShowHide() {
        this.stateInfoSong = (this.stateInfoSong === 'flyIn' ? 'flyOut' : 'flyIn');
        this.stateListMusic = (this.stateListMusic === 'flyIn' ? 'flyOut' : 'flyIn')
    }
    // go back home
    goBackMusic() {
		this.router.navigate(['']);
	}

}
