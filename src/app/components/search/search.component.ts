import {Component, OnInit} from '@angular/core';
import {TmdbService} from '../../services/tmdb.service';
import {FilmInterface} from '../../../interfaces/FilmInterface';
import {debounceTime} from 'rxjs/operators';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    // Define the searchResults property as optional, allowing it to be undefined
    public searchResults?: FilmInterface[];
    private uid = sessionStorage.getItem('uid');

    // Inject the TmdbService into the component
    constructor(public tmdb: TmdbService, public firebaseService: FirebaseService, public router: Router) {
    }

    // This method will be called when the component is initialized
    ngOnInit(): void {
    }

    // This method is called when the user types in the search input
    search(event: KeyboardEvent) {
        // Get the input element from the event
        const inputElement = event.target as HTMLInputElement;
        // Get the search query from the input element's value
        const searchQuery = inputElement.value;

        // If the search query is not an empty string, call the findFilm method
        if (searchQuery) {
            // Use the debounceTime operator to only call the findFilm method
            // when the user has stopped typing for 500ms
            this.tmdb.findFilm(searchQuery)
                .pipe(debounceTime(500))
                // Subscribe to the findFilm method and set the searchResults property
                // with the results
                .subscribe((searchResults: any) => this.searchResults = searchResults);
        }
    }

    addFilm(film: FilmInterface) {
        if (this.uid) {
            this.firebaseService.saveFilm(film, this.uid);
            alert('Película añadida a tu biblioteca');
        } else {
            alert('Debes iniciar sesión para agregar una película a la biblioteca');
            this.router.navigate(['/login']);
        }
    }
}