import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginFirebaseService {

  constructor(public afAuth:AngularFireAuth) { }

  //Login to firebase
  login(email:string,pass:string){
    return new Promise<any>((resolve,reject)=>{
      this.afAuth.signInWithEmailAndPassword(email,pass).then(()=>{
        this.afAuth.authState.subscribe(user=>resolve(user?.uid))
      }).catch(err=>reject(err))
    })
  }

  //Sign up
  signUp(email:string,pass:string){
    return this.afAuth.createUserWithEmailAndPassword(email,pass).then(res=>res).catch(err=>err)
  }

}
