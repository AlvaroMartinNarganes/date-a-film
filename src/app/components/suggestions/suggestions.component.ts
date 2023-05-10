import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {
  title:string="";
  suggestion:string="";

  constructor(public _firebaseService:FirebaseService) { }

  ngOnInit(): void {
  }

  sendSuggestion(){
    const res=this._firebaseService.sendSuggestion(this.title,this.suggestion)
    alert("Sugerencia enviada correctamente")
    this.title="";
    this.suggestion="";
  }

}
