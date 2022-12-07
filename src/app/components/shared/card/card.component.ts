import {Component, Input, OnInit} from '@angular/core';
import {FilmInterface} from "../../../../interfaces/FilmInterface";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() film!: FilmInterface
  fullStar!: number[];
  emptyStar!: number[];


  constructor() {
  }

  ngOnInit(): void {
    //TO-DO
    //Take the rating>get ⭐ with the porcent> fill ⭐
    this.fullStar = Array(4).fill(4)
    this.emptyStar = Array(1).fill(1)
  }

  getRatio = (vote: number) => {
  }
}
