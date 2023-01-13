import { Component, OnInit } from '@angular/core';
import {LoginFirebaseService} from '../../services/login-firebase.service';
import {FirebaseService} from '../../services/firebase.service';
import {UserInterface} from '../../../interfaces/UserInterface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
 public userName:string="AAAAAA";
 public email:string="";
 public avatar:string="";
 public watched:number=0;
 public notWached:number=0;
 public totalFilms:number=0;
 private uid=sessionStorage.getItem("uid")

  constructor(public _userInfoService:LoginFirebaseService, public _filmsFirebaseService:FirebaseService) {

  }

  ngOnInit(): void {
      //Get user info
    const user=this._userInfoService.getUser()
      user.then((res:any)=> {
          this.userName=res.name
          this.email=res.email
          this.avatar=res.avatar
      })

      //Get films
      if(this.uid){
          this._filmsFirebaseService.getFilms(this.uid).then((res:[])=>{
              this.totalFilms=res.length
          })
      }
  }

}
