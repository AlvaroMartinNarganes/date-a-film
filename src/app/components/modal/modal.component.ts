import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilmInterface} from "../../../interfaces/FilmInterface";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() film!: FilmInterface;
  @Output() closeModal= new EventEmitter<void>();

  constructor() {

  }

  ngOnInit(): void {
  }

  onCloseModal(){
    this.closeModal.emit()
  }
}
