import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

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
    return this.http.get(`https://api.themoviedb.org/3/movie/500?api_key=0eba849fdaf3f92d90d4d94b2db09657&language=es-ES`)

  }

}
