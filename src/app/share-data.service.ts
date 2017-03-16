import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
@Injectable()
export class ShareDataService {
 
    public bSubject = new BehaviorSubject(null);
    public OnNext(value: any) {
        this.bSubject.next(value);
    }
    constructor() { }

}
