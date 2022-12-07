import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {FilmInterface} from "../../interfaces/FilmInterface";

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio que conecta con la API y saca los datos
 */
export class TmdbService {
//Api
  constructor(private http: HttpClient) {
  }

  getFilm(id: number): Observable<any> {

    return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=0eba849fdaf3f92d90d4d94b2db09657&language=es-ES`)
      .pipe(map((d: any) => {
        let film: FilmInterface = {
          film_name: d.original_title,
          poster_path: `https://image.tmdb.org/t/p/original/${d.poster_path}`,
          vote_average: d.vote_average,
          release_date: d.release_date,
          overview: d.overview
        }

        return film
      }))
  }

}
