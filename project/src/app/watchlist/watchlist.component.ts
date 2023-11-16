import { Component, OnInit } from '@angular/core';
import { MovieComponent as movie } from '../movie/movie.component';
import { WatchlistService } from '../watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
})
export class WatchlistComponent implements OnInit {
  watch: movie[] = [];

  constructor(public watchlist: WatchlistService) {}

  ngOnInit(): void {
    this.getWatchlist();
  }

  getWatchlist(): void {
    this.watch = this.watchlist.getWatchlist();
  }

  handleClear() {
    this.watchlist.clearWatchlist();
    this.watch = [];
    window.localStorage.setItem('movies', '[]');
  }

  handleButton(movie: movie) {
    let watch = this.handleWatch(movie);
    if (!watch) {
      this.watchlist.addToWatchlist(movie);
    } else {
      this.watchlist.removeFromWatchlist(movie);
    }
  }

  handleWatch(movie: movie) {
    let watch = this.watchlist
      .getWatchlist()
      .filter((e) => e.imdbID === movie.imdbID);

    if (watch.length > 0) {
      return true;
      console.log(watch);
    }

    return false;
  }

  viewButton(movie: movie, a: string) {
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
