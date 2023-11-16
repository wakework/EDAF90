import { Component, OnInit } from '@angular/core';
import { Movie, WatchlistService } from '../watchlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cards: Movie[] = [];
  idx: number = 0;

  constructor(private watchlist: WatchlistService) {}

  ngOnInit(): void {
    /** Fetch featured movies */
    this.showMovie('tt10872600');
    this.showMovie('tt1877830');
    this.showMovie('tt14992922');
  }

  showMovie(imdb: string) {
    this.watchlist
      .getMovieImdb(imdb)
      .subscribe((data: Movie) => {
        this.cards[this.idx] = data;
        this.idx++;
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
    let watch = this.watchlist.getWatchlist().filter((e) => e.imdbID === movie.imdbID);

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

  bigPlot(plot: string) {
    if (plot.length > 200) {
      let temp = plot.substring(0, 200) + '...';
      return temp;
    } else {
      return plot;
    }
  }
}
