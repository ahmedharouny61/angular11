import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-image-radio-demo',
  templateUrl: './image-radio-demo.component.html',
  styleUrls: ['./image-radio-demo.component.css']
})
export class ImageRadioDemoComponent {

  selectedAvatarId: number = 4; // Default selection

  @Output() filterChanged: EventEmitter<string> = new EventEmitter<string>();

  avatarOptions = [
    { id: 1, name: 'Electronics', image: 'assets/avatars/electronics.png' },
    { id: 2, name: 'Toys',        image: 'assets/avatars/toys.png' },
    { id: 3, name: 'Skincare',    image: 'assets/avatars/skincare.jpg' },
    { id: 4, name: 'All',         image: 'assets/all.png' },
    { id: 5, name: 'Dog Supplies',image: 'assets/avatars/dogs.jpg' }
  ];

  onSelectionChange(selectedCategory: string) {
    this.filterChanged.emit(selectedCategory);
  }
}