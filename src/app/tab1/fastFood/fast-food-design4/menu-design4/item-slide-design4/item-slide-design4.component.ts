import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-slide-design4',
  templateUrl: './item-slide-design4.component.html',
  styleUrls: ['./item-slide-design4.component.scss'],
})
export class ItemSlideDesign4Component implements OnInit {
  @Input() menu!: any;
  isLoading = true;
  constructor() {}

  ngOnInit() {
    // Si l'image est déjà définie, on considère qu'elle est chargée
    console.log('Image déjà chargée', this.menu.coverImage);
    if (this.menu.coverImage && this.menu.coverImage !== undefined) {
      this.isLoading = false;
    }
  }

  onImageLoad(event: Event) {
    this.isLoading = false;
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/imgs/placeholder.svg';
    this.isLoading = false;
  }
}
