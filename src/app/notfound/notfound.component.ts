import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css'],
})
export class NotfoundComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goBackMusic() {
		this.router.navigate(['']);
	}

}
