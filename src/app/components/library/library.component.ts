import { Component, OnInit } from '@angular/core';
import {FilmInterface} from '../../../interfaces/FilmInterface';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  public library?:FilmInterface[];
  private uid=sessionStorage.getItem("uid")

  constructor(public firebaseService:FirebaseService,private router:Router) { }

  ngOnInit(): void {
    if(this.uid) {
      this.firebaseService.getFilms(this.uid).then(res => this.library = res)
    }else{
      this.router.navigate(["/login"])
    }
  }

  watched(film:FilmInterface){
    console.log(`Has visto ${film.filmName}`)
    //this.firebaseService.saveFilm(film)
  }

  delete(film:FilmInterface){
    //First delete from de local library
    this.library? this.library =this.library.filter((item: FilmInterface) => item.filmName !== film.filmName):console.log("Ya está vacio");
    //Then, update the bd
    this.firebaseService.deleteFilm(film)
  }
}
