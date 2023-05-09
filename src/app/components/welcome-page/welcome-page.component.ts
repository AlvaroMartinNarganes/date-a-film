import { Component, OnInit } from '@angular/core';
import {FilmInterface} from "../../../interfaces/FilmInterface";
import {TmdbService} from "../../services/tmdb.service";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  library: FilmInterface[] = [];
  constructor(public tmdbService: TmdbService) {
    this.tmdbService.getDiscoverList().subscribe((arrFilm) => {
      this.library = arrFilm;
    });
  }

  ngOnInit(): void {
  }

}
