import {Injectable} from '@angular/core';
import {FilmInterface} from '../../interfaces/FilmInterface';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    // Property to store the film library
    private filmLibrary: FilmInterface[] = [];

    // Inject any necessary dependencies in the constructor
    constructor() {
        this.getLibrary();
    }

    // Method to return the film library
    getFilms() {
        return this.filmLibrary;
    }


    // Method to retrieve the film library from localStorage
    getLibrary() {
        // Get the film library from localStorage
        const library = localStorage.getItem('filmLibrary');

        // If the library exists in localStorage, parse it into an array of FilmInterface objects
        if (library) {
            this.filmLibrary = JSON.parse(library);
        }
    }

    // Method to save a film to the film library in localStorage
    saveFilm(film: FilmInterface) {
        // Add the new film to the film library
        this.filmLibrary.push(film);

        // Save the updated film library to localStorage
        localStorage.setItem('filmLibrary', JSON.stringify(this.filmLibrary));
    }
}