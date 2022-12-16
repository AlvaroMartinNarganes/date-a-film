import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string="";
  pass: string="";
  constructor(public afAuth:AngularFireAuth) { }

  ngOnInit(): void {
  }

  login(){
    //this.afAuth.signInWithEmailAndPassword(this.email,this.pass)
  }
}
