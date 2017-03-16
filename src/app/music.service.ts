import 'rxjs';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Music } from './music';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MusicService {
    constructor(private htpp: Http) { }
    // get music from api
    public getListMusic(): Observable<Music[]> {
        const UrlApi = 'https://cors-anywhere.herokuapp.com/http://mp3.zing.vn/json/playlist/get-source/playlist/knxHtLCkZQLmzykFcybHLm';
        return this.htpp.get(UrlApi)
            .map(value => {
                return value.json().data;
            })
            .catch(this.handleError)
    }
    // get a song from api by id
    public getSong(id: string): Observable<any> {
        let url = `https://cors-anywhere.herokuapp.com/http://api.mp3.zing.vn/api/mobile/song/getsonginfo?requestdata=%7B"id":"${id}"%7D`;
        return this.htpp.get(url)
            .map(response => response.json())
            .catch(this.handleError);

    }
    public getLyric(urlLyric: string): Observable<string> {
        return this.htpp.get(urlLyric).map(response => response.text())
    }
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
