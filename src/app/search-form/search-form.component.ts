import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import {
    Component,
    OnInit,
    animate,
    state,
    style,
    transition,
    trigger,
    keyframes,
    ViewEncapsulation,
    ElementRef,
    ViewChild,
    Input
} from '@angular/core';

@Component({
    selector: 'app-search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('widthInput', [
            state('inactive', style(
                { width: 0, opacity: 0 }
            )),
            state('active', style(
                { width: 220, opacity: 1 }
            )),
            transition('active <=> inactive', animate(300))
        ]),
        trigger('handleError', [
            state('valid', style(
                { transform: 'translate(0)' }
            )),
            state('invalid', style(
                { transform: 'translate(0)' }
            )),
            transition("valid <=> invalid", animate(200, keyframes(
                [
                    style(
                        { transform: 'translate(10px)' }
                    ),
                    style(
                        { transform: 'translate(-10px)' }
                    ),
                    style(
                        { transform: 'translate(0)' }
                    )
                ]
            )
            ))
        ])
    ]
})
export class SearchFormComponent implements OnInit {

    searchForm: FormGroup;
    searchInput: AbstractControl;
    public state: string = 'inactive';
    toggleIcon: boolean = true;
    stateInput: string = "valid";
    @ViewChild('buttonOpenSearch') public buttonOpenSearch: ElementRef;
    @Input("sidenavSearch") sidenavSearch: any;
    constructor(
        private builder: FormBuilder,
        private route: Router,
    ) { }

    ngOnInit() {
        this.createForm();
    }
    // trigger width animation input search
    activeAnimate() {
        this.state = (this.state === 'inactive' ? 'active' : 'inactive');
        this.toggleIcon = !this.toggleIcon;
        if (this.toggleIcon) {
            this.searchInput.setValue(null);
        }
    }
    // create form search
    createForm() {
        this.searchForm = this.builder.group({
            searchInput: []
        });
        this.searchInput = this.searchForm.controls['searchInput'];
    }
    // search
    sendKeyword(event) {
        if (event.keyCode === 13) {
            // close sidenav Search
            let widthWindow = event.view.outerWidth;
            // get value from search input
            let value = event.target.value;
            if (value !== "") {
                //this.shareDataService.OnNext(value);
                // format keyword
                let keyword = this.formatKeyword(value);
                // go to SearchComponent
                this.route.navigate(['search', keyword]);
                if (widthWindow <992) {
                    this.sidenavSearch.close();
                }
            }
            else {
                // input empty
                this.stateInput = (this.stateInput === "valid" ? "invalid" : "valid");
            }
        }
    }
    // remove space and replace by "-"
    formatKeyword(keyword: string): string {
        let arrayKeyword: string[] = keyword.split(" ");
        let result = arrayKeyword.join("_");
        return result;
    }

}
