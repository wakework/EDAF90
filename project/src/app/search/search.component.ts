import { Component, OnInit } from '@angular/core';
import { Movie, WatchlistService } from '../watchlist.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private watchlist: WatchlistService) {}

  ngOnInit(): void {}

  onSearch(url: string) {
    this.movies = [];

    if (url != '') {
      this.watchlist.getMovieSearch(url).subscribe((data: any) => {
        for (let i = 0; i < data.Search.length; i++) {
          this.movies.push(data.Search[i]);
        }
      });
    }
  }
}
