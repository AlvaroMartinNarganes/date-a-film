import { Component, Input, OnInit } from '@angular/core';
import { FilmInterface } from '../../../../interfaces/FilmInterface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  // Input property for the film to display in the card
  @Input() film!: FilmInterface;

  // Flag to show/hide the modal
  showModal: boolean = false;

  constructor() {}

  ngOnInit(): void {
    // Perform initialization logic
  }

  // Method to open the modal
  openModal() {
    this.showModal = true;
  }

  // Method to close the modal
  closeModal() {
    this.showModal = false;
  }

}