import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PorteFeuilHistoriquePage } from '../../../../tab3/historique/porte-feuil-historique/porte-feuil-historique.page';

@Component({
  selector: 'app-item3',
  templateUrl: './item3.component.html',
  styleUrls: ['./item3.component.scss'],
})
export class Item3Component implements OnInit {
  @Input() fastFood: any;
  @Input() menu: any;
  isLoading = true;
  // Flag to detect if the original image failed to load
  private hasError = false;
  constructor() {}

  ngOnInit() {
    // Si l'image est déjà définie, on considère qu'elle est chargée
    if (this.menu.coverImage) {
      this.isLoading = false;
    }
  }

  onImageLoad(event: Event) {
    this.isLoading = false;

    // If an error already occurred (fallback image), do not apply scaling
    if (this.hasError || this.menu.coverImageHasBackground || this.menu.coverImageHasBackground == undefined) {
      return;
    }

    const img = event.target as HTMLImageElement;
    // Apply scaling to the surrounding card instead of the image itself
    const card = img.closest('.card-img-food') as HTMLElement | null;
    if (card) {
      card.style.transition = 'transform 0.3s ease';
      card.style.transform = 'scale(1.5)';
    }
  }

  onImageError(event: Event) {
    // Mark that an error occurred so we know not to scale the fallback image
    this.hasError = true;

    const img = event.target as HTMLImageElement;
    img.src = '/assets/imgs/placeholder.svg';
    // img.src = '/assets/gmx.png';
    this.isLoading = false;
  }
}
