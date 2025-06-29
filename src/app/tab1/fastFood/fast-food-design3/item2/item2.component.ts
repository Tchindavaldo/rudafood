import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item2',
  templateUrl: './item2.component.html',
  styleUrls: ['./item2.component.scss'],
})
export class Item2Component implements OnInit {
  @Input() menu: any;
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
