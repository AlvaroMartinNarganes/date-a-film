import {Injectable} from '@angular/core';
import {FilmInterface} from '../../interfaces/FilmInterface';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Observable, Subject} from "rxjs";
import firebase from "firebase/compat";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  // Property to store the film library
  //private filmLibrary: FilmInterface[] = [];

  // Inject any necessary dependencies in the constructor
  constructor(public db: AngularFirestore) {
    //this.getLibrary();
  }

  // Method to return not watched films
  getFilms(uid_user: string) {
    var films: FilmInterface[]=[];
    return new Promise<any>((resolve) => {
      this.db.collection('library').valueChanges().subscribe(async library => {
        //Get user films
        const userFilms = library.filter((i: any) => i['uid_user'] == uid_user && !i['watched']).map((item: any) => item.uid_film);
        //Get films
        for (const userFilm of userFilms) {
          const a = await this.db.collection('films').doc(userFilm + '')
          // @ts-ignore
          const filmDoc: Observable<DocumentSnapshot> = a.get();
          filmDoc.subscribe((filmDoc: { exists: any; data: () => any; }) => {
            if (filmDoc.exists) {
              const filmData = filmDoc.data();
              films.push(filmData);
            }
          });
        }
        resolve(films);
      });
    });
  }

  getWatchedFilms(uid_user:string){
    var films: FilmInterface[]=[];
    return new Promise<any>((resolve) => {
      this.db.collection('library').valueChanges().subscribe(async library => {
        //Get user films
        const userFilms = library.filter((i: any) => i['uid_user'] == uid_user && i['watched']).map((item: any) => item.uid_film);
        //Get films
        for (const userFilm of userFilms) {
          const a = await this.db.collection('films').doc(userFilm + '')
          // @ts-ignore
          const filmDoc: Observable<DocumentSnapshot> = a.get();
          filmDoc.subscribe((filmDoc: { exists: any; data: () => any; }) => {
            if (filmDoc.exists) {
              const filmData = filmDoc.data();
              films.push(filmData);
            }
          });
        }
        resolve(films);
      });
    });
  }

  // Method to retrieve the film library from localStorage
  getLibrary(uid_user:string) {
    var subject = new Subject<string>();
    // Get the film library from Firebase
    this.db.collection("library",ref=>ref.where("uid_user", "==", uid_user)).get().subscribe((data: any) => {
      // Update the film library property with the data from Firebase
      const docSnapshots = data.docs;
      subject.next(docSnapshots);
      /*for (const docSnapshot of docSnapshots) {
        console.log(docSnapshot.data())
      }*/
    })
    return subject.asObservable();
  }

  // Method to save a film to the film library
  saveFilm(film: FilmInterface, uid_user: string) {
    //Get the user uid
    //film.uid = uid;
    film.watched = false;
    this.db.collection('films').doc(film.uid + '').set(film).then(r => r); //It doesn´t care if exists, it will replace the film with exactly the same

    //Save the film in the user library,check if the user have added the film already
    const relationship={
      uid_user:uid_user,
      uid_film:film.uid,
      watched:false
    }

    this.db.collection('library').valueChanges().subscribe(library => {
      //const userFilm = films.filter((i: any) => i['uid'] == uid);
      const existRel=library.filter((i:any)=>i['uid_film']==relationship.uid_film && i['uid_user']==relationship.uid_user );
      if(!existRel.length){
        this.db.collection('library').doc().set(relationship).then(r => r);
      }
    });

  }

  //Method to delete a film from the list
  deleteFilm(film: FilmInterface, uid: string) {
      this.db.collection("library",ref=>ref.where("uid_film", "==", film.uid)
        .where("uid_user", "==", uid)).get().subscribe((data: any) => {
        // Update the film library property with the data from Firebase
        const docSnapshots = data.docs;
        const idFilm=docSnapshots[0].id;
        this.db.collection('library').doc(idFilm).delete().then(r => r);
      })

  }

  //Method to set a film to watched
  watchedFilm(film: FilmInterface, uid: string) {
    this.db.collection("library",ref=>ref.where("uid_film", "==", film.uid)
      .where("uid_user", "==", uid)).get().subscribe((data: any) => {
      // Update the film library property with the data from Firebase
      const docSnapshots = data.docs;
      const idFilm=docSnapshots[0].id;
      this.db.collection('library').doc(idFilm).update({watched:true}).then(res=>res);
    })
  }

  //Method to save a new suggestion
  sendSuggestion(title:string,suggestion:string){
    let suggestionObject = {
      'title': title,
      'suggestion': suggestion
    }

    this.db.collection('suggestions').doc().set(suggestionObject).then(res => {
      console.log(res)
      return res
    });

  }
}
