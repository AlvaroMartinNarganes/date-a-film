import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {UserInterface} from '../../interfaces/UserInterface';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
    providedIn: 'root'
})
export class LoginFirebaseService {

    constructor(public afAuth: AngularFireAuth) {
    }

    //Login to firebase
    login(email: string, pass: string) {
        return new Promise<any>((resolve, reject) => {
            this.afAuth.signInWithEmailAndPassword(email, pass).then(() => {
                this.afAuth.authState.subscribe(user => resolve(user?.uid));
            }).catch(err => reject(err));
        });
    }

    //Sign up
    async signUp(email: string, pass: string, userName: string) {
        return this.afAuth.createUserWithEmailAndPassword(email, pass).then(res => {
            res.user?.updateProfile({displayName: userName});
            res.user?.sendEmailVerification();
        }).catch(err => err);
    }

    //Get User Info
    getUser() {
        //User.displayName, User.email,User.photoUrl
        return new Promise(resolve => {
            this.afAuth.authState.subscribe((user:any) => {
                console.log(user);
                const userFilter: UserInterface = {
                    name: user.displayName,
                    email: user.email,
                    avatar: user?.photoURL
                };
                resolve(userFilter);
            });
        });

    }
}
