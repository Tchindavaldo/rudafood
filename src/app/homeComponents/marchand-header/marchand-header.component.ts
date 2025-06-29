import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-marchand-header',
  templateUrl: './marchand-header.component.html',
  styleUrls: ['./marchand-header.component.scss'],
})
export class MarchandHeaderComponent implements OnInit, OnChanges {
  @Input() name = 'no name';
  @Input() fastFoodData!: any;
  @Input() rating: number = 0; // Rating value (e.g., 3.5)
  isLoading = true;
  starFills: number[] = []; // Percentage (0-100) fill for each star

  private maxStars = 5; // Maximum number of stars to display

  constructor() {}

  ngOnInit() {
    // Si l'image est déjà définie, on considère qu'elle est chargée
    if (this.fastFoodData?.image && this.fastFoodData?.image !== undefined) {
      this.isLoading = false;
    }
    this.generateStars();
  }

  ngOnChanges() {
    this.generateStars();
  }

  private generateStars() {
    this.starFills = [];
    for (let i = 0; i < this.maxStars; i++) {
      let fillPercent = 0;
      const starStartValue = i;

      if (this.rating >= i + 1) {
        // Full star
        fillPercent = 100;
      } else {
        // Partial star (0 < remainder < 1)
        fillPercent = Math.max(0, Math.round((this.rating - starStartValue) * 10) * 10);
      }
      this.starFills.push(fillPercent);
    }
  }

  onImageLoad(event: Event) {
    this.isLoading = false;
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/images/defaultFastFood/5.png';
    this.isLoading = false;
  }
}
