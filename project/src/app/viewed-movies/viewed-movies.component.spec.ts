import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewedMoviesComponent } from './viewed-movies.component';

describe('ViewedMoviesComponent', () => {
  let component: ViewedMoviesComponent;
  let fixture: ComponentFixture<ViewedMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewedMoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewedMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
