import {Component, OnInit} from '@angular/core';
import {TmdbService} from "../../services/tmdb.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

})
export class HomeComponent implements OnInit {
  film: any = "";

  constructor(public tmdbService: TmdbService) {
  }

  ngOnInit(): void {
    this.tmdbService.getFilm(550).subscribe(d => {
      console.log(d)
      this.film = d
    })

  }

}
