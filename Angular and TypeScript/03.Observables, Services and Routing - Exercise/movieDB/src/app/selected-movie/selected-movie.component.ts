import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { MoviesService } from './../services/movies.service';

@Component({
  selector: 'app-selected-movie',
  templateUrl: './selected-movie.component.html',
  styleUrls: ['./selected-movie.component.css']
})
export class SelectedMovieComponent implements OnInit {
  myMovie;
  constructor(private route: ActivatedRoute, private moviesService: MoviesService ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
        let id = params['id'];
        this.moviesService.getMovie(id).subscribe((selectedMovie) => {
          this.myMovie = selectedMovie;
        });
    });
  }

}
