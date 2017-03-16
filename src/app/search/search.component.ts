import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MusicService } from '../music.service';
import { ShareDataService } from '../share-data.service';
import { Music } from '../music';
import { NgProgressService } from 'ng2-progressbar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

	public keyword: string;
	public checkSearch: boolean = true;
	public listMusicSearing: Array<Music>;
	constructor(
		private musicService: MusicService,
		private title: Title,
		private processbar: NgProgressService,
		private activated: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
		// get params from router
		this.getParamRouter();
	}
	// Get params from router
	getParamRouter() {
		this.activated.params.subscribe((params: Params) => {
			let myParams = params['value'];
			this.keyword = this.ReformatKeyword(myParams);
			//console.log(this.keyword);
			this.processbar.start();
			this.getMusic();
		})

	}
	// reformat keyword (remove "-" and replace by " ")
	ReformatKeyword(keyword: string): string {
		let arrayKeyword = keyword.split("_");
		let result = arrayKeyword.join(" ");
		return result;
	}
	// get listMusic from Music Service
	getMusic() {
		this.musicService.getListMusic().subscribe(
			(musics: Music[]) => {
				let listMusic = musics;
				this.onSearch(listMusic);
				// this.listMusic = this.onSearch(listMusic);
				//console.log(this.listMusic);
				this.setTitle();
			}
		)
	}

	// Search using search in javascript
	onSearch(listMusic: Music[]) {
		this.listMusicSearing = [];
		//let arrayFiler = listMusic;
		for (let i = 0; i < listMusic.length; i++) {
			let positionName: number = -1;
			let positonArtist: number = -1;
			let nameSong = listMusic[i].name.toLowerCase();
			let artistSong = listMusic[i].artist.toLowerCase();
			positionName = nameSong.search(this.keyword.toLowerCase());
			positonArtist = artistSong.search(this.keyword.toLowerCase());
			if (positionName !== -1 || positonArtist !== -1) {
				this.listMusicSearing.push(listMusic[i]);
			}

		}
		if (this.listMusicSearing.length === 0) {
			this.checkSearch = false;
		}
		else {
			this.checkSearch = true;
		}
		// done process bar
		this.processbar.done();
	}
	setTitle() {
		this.title.setTitle('Tìm kiếm | ' + this.keyword);
	}
	goBackMusic() {
		this.router.navigate(['']);
	}

}
