import { Component, OnInit } from '@angular/core';
import {FilmInterface} from '../../../interfaces/FilmInterface';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  public library?:FilmInterface[];
  constructor(public firebaseService:FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.getFilms().then(res => this.library=res)
  }

  watched(film:FilmInterface){
    console.log(`Has visto ${film.filmName}`)
    this.firebaseService.saveFilm(film)
  }

  delete(film:FilmInterface){
    //First delete from de local library
    this.library? this.library =this.library.filter((item: FilmInterface) => item.filmName !== film.filmName):console.log("Ya está vacio");
    //Then, update the bd
    this.firebaseService.deleteFilm(film)
  }
}
