import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {LoginFirebaseService} from '../../services/login-firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string="";
  pass: string="";
  constructor(public loginFirebase:LoginFirebaseService, private router:Router) {
    if(sessionStorage.getItem("uid")){
      this.router.navigate(["library"])
    }
  }

  ngOnInit(): void {
  }

  login(){
    this.loginFirebase.login(this.email,this.pass).then(res=>{
      //save the uid
      sessionStorage.setItem("uid",res)
      this.router.navigate(["/library"])
    }).catch(err=>console.log(err))


  }
}
