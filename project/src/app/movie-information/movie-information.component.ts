import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie, WatchlistService } from '../watchlist.service';

@Component({
  selector: 'app-movie-information',
  templateUrl: './movie-information.component.html',
  styleUrls: ['./movie-information.component.css'],
})
export class MovieInformationComponent implements OnInit {
  info = {} as Movie;

  constructor(private router: Router, private watchlist: WatchlistService) {}

  ngOnInit(): void {
    let url = this.router.url;
    let urlArray = url.split('/');
    this.watchlist.getMovieInfo(urlArray[2]).subscribe((data: Movie) => {
      this.info = data;
    });
  }

  handleButton(movie: Movie) {
    let watch = this.handleWatch(movie);
    if (!watch) {
      this.watchlist.addToWatchlist(movie);
    } else {
      this.watchlist.removeFromWatchlist(movie);
    }
  }

  handleWatch(movie: Movie) {
    let watch = this.watchlist
      .getWatchlist()
      .filter((e) => e.imdbID === movie.imdbID);

    if (watch.length > 0) {
      return true;
    }

    return false;
  }

  viewButton(movie: Movie, a: string) {
    let button = this.handleWatch(movie);

    if (a === 'button') {
      if (button) {
        return 'Remove from Watchlist';
      }

      return 'Add to Watchlist';
    } else {
      if (button) {
        return 'bookmark';
      }

      return 'bookmark_border';
    }
  }
}
