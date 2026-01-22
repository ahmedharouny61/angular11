import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnChanges {

  // NEW: Accepts the list of category names (e.g. ['Electronics', 'Toys'])
  @Input() categories: string[] = [];
  
  // NEW: Accepts a dictionary of counts (e.g. { 'Electronics': 5, 'Toys': 2 })
  @Input() counts: { [key: string]: number } = {};
  
  // Total count of all items
  @Input() all: number = 0;

  @Output() filterRadioButtonSelectionChanged: EventEmitter<string> = new EventEmitter<string>();

  selectedRadioButtonValue: string = 'All';
  
  // This will hold the final list to display in HTML
  displayList: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    // 1. Always start with the "All" option
    this.displayList = [
      { name: 'All', count: this.all, image: 'assets/all.png' }
    ];

    // 2. Loop through the dynamic categories and add them
    // Note: You might need to add a default image if one is missing
    this.categories.forEach(cat => {
      this.displayList.push({
        name: cat,
        count: this.counts[cat] || 0,
        // Helper logic to pick an image based on name (or use default)
        image: this.getImageForCategory(cat) 
      });
    });
  }

  onRadioButtonSelectionChanged() {
    this.filterRadioButtonSelectionChanged.emit(this.selectedRadioButtonValue);
  }

  // Helper to map dynamic names to your assets
  getImageForCategory(categoryName: string): string {
    const lowerName = categoryName.toLowerCase();
    if (lowerName.includes('electronic')) return 'assets/avatars/electronics.png';
    if (lowerName.includes('toy')) return 'assets/avatars/toys.png';
    if (lowerName.includes('skin')) return 'assets/avatars/skincare.jpg';
    if (lowerName.includes('dog')) return 'assets/avatars/dogs.jpg';
    
    // Fallback image if a new category is added (e.g., "Furniture")
    return 'assets/avatars/default.png'; 
  }
}