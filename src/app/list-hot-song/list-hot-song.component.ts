import { Component, OnInit, Input } from '@angular/core';
import { Music } from '../music';

@Component({
  selector: 'app-list-hot-song',
  templateUrl: './list-hot-song.component.html',
  styleUrls: ['./list-hot-song.component.css']
})
export class ListHotSongComponent implements OnInit {

  @Input("listHotSong") listHotSong: Music[];
  @Input("song") song: any;
  @Input("toggle") toggle: boolean;

  constructor() { }

  ngOnInit() {
  }
  // load more songs
  loadMore(event) {
    this.toggle = !this.toggle;
    if (this.toggle) {
      event.path[0].innerText = "Xêm thêm";
    }
    else {
      event.path[0].innerText = "Thu gọn"
    }
  }

}
