import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  items: Movie[] = [];
  source = new Subject<Movie[]>();
  movie$ = this.source.asObservable();

  constructor(private http: HttpClient) {
    let movies = window.localStorage.getItem('movies');

    /** Add localStorage to items after reload of page. */
    if (movies !== null) {
      JSON.parse(movies).map((e: Movie) => {
        this.addToWatchlist(e);
      });
    }
  }

  /** Basic Functions for Watchlist */
  addToWatchlist(movie: Movie) {
    window.localStorage.setItem(
      'movies',
      JSON.stringify([...this.items, movie])
    );

    this.items.push(movie);
    this.source.next(this.items);
  }

  removeFromWatchlist(movie: Movie) {
    let idx = this.items.indexOf(movie);
    this.items.splice(idx, 1);
    this.source.next(this.items);

    window.localStorage.setItem('movies', JSON.stringify(this.items));
  }

  getWatchlist() {
    return this.items;
  }

  clearWatchlist() {
    this.items = [];
    this.source.next(this.items);
  }

  /** ------------- Functions for getting data from OMDB -------------- */
  getMovieImdb(imdb: string) {
    return this.http.get<Movie>(
      'https://www.omdbapi.com/?i=' + imdb + '&plot=full&apikey=e530b6c6'
    );
  }

  getMovieSearch(url: string) {
    return this.http.get<Movie>(
      'https://www.omdbapi.com/?s=' + url + '&apikey=e530b6c6'
    );
  }

  getMovieInfo(url: string) {
    return this.http.get<Movie>(
      'https://www.omdbapi.com/?t=' + url + '&plot=full&apikey=e530b6c6'
    );
  }
}

/** Interface for Movies, instead of using MovieComponent. */
export interface Movie {
  Title: string;
  Year: number;
  rated: string;
  Released: Date;
  Runtime: string;
  Genre: string[];
  Director: string[];
  writer: string[];
  Actors: string[];
  Plot: string;
  language: string;
  country: string;
  Awards: string;
  Poster: string;
  Ratings: string[];
  Metascore: number;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  type: string;
  dvd: Date;
  BoxOffice: string;
}
