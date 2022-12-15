import {Injectable} from '@angular/core';
import {FilmInterface} from '../../interfaces/FilmInterface';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    // Property to store the film library
    private filmLibrary: FilmInterface[] = [];

    // Inject any necessary dependencies in the constructor
    constructor(public db: AngularFirestore) {
        this.getLibrary();
    }

    // Method to return the film library
    getFilms() {
        return new Promise<any>((resolve) => {
            this.db.collection('films').valueChanges().subscribe(users => resolve(users));
        });
    }


    // Method to retrieve the film library from localStorage
    getLibrary() {
        // Get the film library from Firebase
        this.db.collection('films').valueChanges().subscribe((data: any) => {
            // Update the film library property with the data from Firebase
            this.filmLibrary = data;

        });
    }

    // Method to save a film to the film library in localStorage
    saveFilm(film: FilmInterface) {
        this.db.collection('films').doc(film.filmName).set(film).then(r => r);
    }

    deleteFilm(film: FilmInterface) {
        this.db.collection('films').doc(film.filmName).delete().then(r => r);
    }
}