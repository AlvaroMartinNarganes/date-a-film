import {Component, OnInit} from '@angular/core';
import {TmdbService} from '../../services/tmdb.service';
import {FilmInterface} from '../../../interfaces/FilmInterface';
import {FirebaseService} from '../../services/firebase.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    // Film to display on the home page
    film: FilmInterface = {
        filmName: '',
        posterPath: ``,
        voteAverage: 0,
        releaseDate: '',
        overview: ''
    };
    private uid=sessionStorage.getItem("uid")

    //Library with some films to display
    library: FilmInterface[] = [];

    currentIndex = 0;

    // Inject the TmdbService instance
    constructor(public tmdbService: TmdbService, public firebaseService: FirebaseService) {
        this.tmdbService.getDiscoverList().subscribe((arrFilm) => {
            this.library = arrFilm;
        });
    }

    ngOnInit(): void {
    }

    // Save the current film
    saveFilm(film: FilmInterface) {
        if(this.uid){
            this.firebaseService.saveFilm(film,this.uid);
            this.currentIndex = (this.currentIndex + 1) % this.library.length;
        }else{
            alert("Necesitas iniciar sesión para guardar películas")
        }

    }

    // Discard the current film
    nextFilm() {
        this.currentIndex = (this.currentIndex + 1) % this.library.length;
    }
}