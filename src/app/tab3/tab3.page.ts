import { Component } from '@angular/core';
import { Users } from '../data/Users';
import { NavigationEnd, Router } from '@angular/router';
import { ToastButton, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  user!: Users;

  focus2 = 'FastFood';
  showFatsFood = true;

  currentUrl: string = '';
  selectedChip: string = 'commande';
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
      }
    });
  }

  shouldHideElement(): boolean {
    return this.currentUrl.includes('   menu/new-menu');
  }

  isSelected(chip: string): boolean {
    return this.selectedChip === chip;
  }

  selectChip(chip: string): void {
    this.selectedChip = chip;
  }
}
