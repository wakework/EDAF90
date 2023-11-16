import { Component } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

// Not used anymore
export class MovieComponent {
  Title: string = '';
  Year: number = 0;
  rated: string = '';
  Released: Date = new Date(0);
  Runtime: string = '';
  Genre: string[] = [];
  Director: string[] = [];
  writer: string[] = [];
  Actors: string[] = [];
  Plot: string = '';
  language: string = '';
  country: string = '';
  Awards: string = '';
  Poster: string = '';
  Ratings: string[] = [];
  Metascore: number = 0;
  imdbRating: string = "";
  imdbVotes: string = '';
  imdbID: string = '';
  type: string = '';
  dvd: Date = new Date(0);
  BoxOffice: string = '';

  constructor() {}
}
