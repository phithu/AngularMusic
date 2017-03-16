import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { MenuComponent } from './menu/menu.component';
import { MusicComponent } from './music/music.component';
import { MusicDetailComponent } from './music-detail/music-detail.component';
import { MusicService } from './music.service';
import { NgProgressModule } from 'ng2-progressbar';
import { PlayerComponent } from './player/player.component';
import { SearchComponent } from './search/search.component';
import { MenuMobileComponent } from './menu-mobile/menu-mobile.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ListSongComponent } from './list-song/list-song.component';
import { ListHotSongComponent } from './list-hot-song/list-hot-song.component';
import 'hammerjs';
import { LocationStrategy, HashLocationStrategy } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MusicComponent,
    MusicDetailComponent,
    PlayerComponent,
    SearchComponent,
    MenuMobileComponent,
    ListHotSongComponent,
    SearchFormComponent,
    NotfoundComponent,
    ListSongComponent
  ],
  imports: [
    MaterialModule,
    NgProgressModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '', children: [
          {
            path: 'song', children:
            [
              {
                path: ':id', component: MusicDetailComponent
              },
              {
                  path: '', component: MusicComponent
              }
            ]
          },
          { path: '', component: MusicComponent },
        ]
      },
      {
        path: 'search', children: [
          { path: ':value', component: SearchComponent },
          { path: '', component: NotfoundComponent },

        ]
      },
      { path: '**', component: NotfoundComponent },
    ]
      , { useHash: true }
    )

  ],
  providers: [MusicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
