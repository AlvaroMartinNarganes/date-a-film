import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {FilmInterface} from '../../interfaces/FilmInterface';

@Injectable({
    providedIn: 'root'
})
export class TmdbService {
    private APIKEY = '0eba849fdaf3f92d90d4d94b2db09657';

    constructor(private http: HttpClient) {
    }

    getFilm(id: number): Observable<any> {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=0eba849fdaf3f92d90d4d94b2db09657&language=es-ES`;
        return this.http.get(url).pipe(
            map((response: any) => {
                const film: FilmInterface = {
                    filmName: response.original_title,
                    posterPath: `https://image.tmdb.org/t/p/original/${response.poster_path}`,
                    voteAverage: response.vote_average,
                    releaseDate: response.release_date,
                    overview: response.overview
                };
                return film;
            })
        );
    }


    getDiscoverList() {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=0eba849fdaf3f92d90d4d94b2db09657&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
        return this.http.get(url).pipe(
            map((res: any) => {
                //Get the films I need and return
                const library: FilmInterface[] = [];
                for (const resFilm of res['results']) {
                    const film: FilmInterface = {
                        filmName: resFilm.original_title,
                        posterPath: `https://image.tmdb.org/t/p/original/${resFilm.poster_path}`,
                        voteAverage: resFilm.vote_average,
                        releaseDate: resFilm.release_date,
                        overview: resFilm.overview
                    };
                    library.push(film);
                }
                return library;
            })
        );
    }


    findFilm(name: string) {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=0eba849fdaf3f92d90d4d94b2db09657&query=${name}&language=es`;
        return this.http.get(url).pipe(
            map((res: any) => {
                //Get the films I need and return
                const library: FilmInterface[] = [];
                for (const resFilm of res['results']) {
                    const film: FilmInterface = {
                        filmName: resFilm.original_title,
                        posterPath: `https://image.tmdb.org/t/p/original/${resFilm.poster_path}`,
                        voteAverage: resFilm.vote_average,
                        releaseDate: resFilm.release_date,
                        overview: resFilm.overview
                    };
                    library.push(film);
                }
                return library;
            })
        );
    }
}