import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-design2',
  templateUrl: './menu-design2.component.html',
  styleUrls: ['./menu-design2.component.scss'],
})
export class MenuDesign2Component implements OnInit {
  @Input() menu!: any;
  isLoading = true;
  constructor() {}

  ngOnInit() {
    // Si l'image est déjà définie, on considère qu'elle est chargée
    if (this.menu.coverImage) {
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
