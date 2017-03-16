import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-menu-mobile',
    templateUrl: './menu-mobile.component.html',
    styleUrls: ['./menu-mobile.component.css']
})
export class MenuMobileComponent implements OnInit {
    @Input("sidenavMenu") sidenavMenu: any;

    constructor() { }

    ngOnInit() {
    }
    // close navbar side
    onClickLink() {
        this.sidenavMenu.close();
    }

}
