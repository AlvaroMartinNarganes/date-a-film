import {Component, Input, OnInit} from '@angular/core';
import {FilmInterface} from "../../../interfaces/FilmInterface";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() film!: FilmInterface;

  constructor() {
  }

  ngOnInit(): void {
  }

}
