import {Component, OnInit} from '@angular/core';
import {TmdbService} from "../../services/tmdb.service";
import {FilmInterface} from "../../../interfaces/FilmInterface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

})
export class HomeComponent implements OnInit {
  film: FilmInterface = {
    film_name: "",
    poster_path: ``,
    vote_average: 0,
    release_date: "",
    overview: ""
  };

  constructor(public tmdbService: TmdbService) {
    //Inicialize a film
    this.tmdbService.getFilm(550).subscribe(d => {
      this.film = d

    })
  }

  ngOnInit(): void {


  }

}
