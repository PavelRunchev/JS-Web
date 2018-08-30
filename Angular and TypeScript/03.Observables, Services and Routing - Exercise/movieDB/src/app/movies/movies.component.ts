import { Component, OnInit } from '@angular/core';
import { MoviesService } from './../services/movies.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  popular : Array<Movie>;
  theaters : Array<Movie>;
  kids : Array<Movie>;
  drama : Array<Movie>;
  searchedResult : any;
  noSearchedResult;
  notSearch : string = '';

  isSearched;

  constructor(private moviesService : MoviesService) { }

  search(myQuery) {
    let value = myQuery['search'];
    this.moviesService.findAMovie(value).subscribe(data => {
      if(data['results'].length > 0) {
        this.searchedResult = data;
        this.isSearched = true;
        this.noSearchedResult = false;
      } else {
        this.notSearch = "No searched movies!"
        this.noSearchedResult = true;
      }
    });
  }

  ngOnInit() {
    this.moviesService
      .getPopular()
      .subscribe(data => {
        this.popular = data.results;
      });

    this.moviesService
      .getTheatres()
      .subscribe(data => {
        this.theaters = data.results;
      });

    this.moviesService
      .getKids()
      .subscribe(kidsData => {
        this.kids = kidsData.results;
      });

    this.moviesService
      .getDrama()
      .subscribe(dramaData => {
        this.drama = dramaData.results;
      });
  }

}
