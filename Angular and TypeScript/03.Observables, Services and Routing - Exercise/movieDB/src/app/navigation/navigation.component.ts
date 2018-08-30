import { Component, OnInit } from '@angular/core';
import { MoviesService } from './../services/movies.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  title: string = "Movie Finder";
  constructor(private moviesService : MoviesService) { }

  ngOnInit() {
  }

}
