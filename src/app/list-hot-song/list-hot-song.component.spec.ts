import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHotSongComponent } from './list-hot-song.component';

describe('ListHotSongComponent', () => {
  let component: ListHotSongComponent;
  let fixture: ComponentFixture<ListHotSongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHotSongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHotSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
