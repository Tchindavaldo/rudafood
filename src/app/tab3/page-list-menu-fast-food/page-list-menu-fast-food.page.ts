import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { getMenuService } from 'src/services/menu/requet/get-menu.service';
import { AppState } from 'src/store/indx';

@Component({
  selector: 'app-page-list-menu-fast-food',
  templateUrl: './page-list-menu-fast-food.page.html',
  styleUrls: ['./page-list-menu-fast-food.page.scss'],
})
export class PageListMenuFastFoodPage implements OnInit {
  selectedChip: string | null = null;

  isLoading = false;
  erroDataGeting = false;
  menuTab!: Observable<any>;

  // Compteurs pour les menus
  totalMenus: number = 0;
  availableMenus: number = 0;
  unavailableMenus: number = 0;
  
  // Date du jour formatée
  currentDate: string = '';

  constructor(private router: Router, private store: Store<AppState>, private menuService: getMenuService) {}
  ngOnInit() {
    this.selectChip('menu');
    this.fetchMenu();
    this.formatCurrentDate();
  }
  
  // Formater la date du jour au format "2 Aout 2024"
  formatCurrentDate() {
    const today = new Date();
    const day = today.getDate();
    
    // Tableau des mois en français avec majuscule
    const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    
    const month = months[today.getMonth()];
    const year = today.getFullYear();
    
    this.currentDate = `${day} ${month} ${year}`;
  }

  // Méthode pour mettre à jour les compteurs de menus
  async updateMenuCounters(menus: any) {
    try {
      if (menus) {
        this.totalMenus = menus.length;
        this.availableMenus = menus.filter((menu: any) => menu.status === 'available').length;
        this.unavailableMenus = menus.filter((menu: any) => menu.status === 'unavailable').length;
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des compteurs de menus:', error);
      this.totalMenus = 0;
      this.availableMenus = 0;
      this.unavailableMenus = 0;
    }
  }

  selectChip(chipId: string) {
    this.selectedChip = chipId;
  }

  isSelected(chipId: string): boolean {
    return this.selectedChip === chipId;
  }

  redirect(path: string) {
    this.router.navigate([path]);
  }

  async fetchMenu() {
    try {
      this.menuTab = this.store.select(state => state.menu.menuTab);

      this.menuTab.subscribe(menus => {
        this.updateMenuCounters(menus);
      });
      if ((await firstValueFrom(this.menuTab)) !== null) return;
      console.log('fetching data apppeler');
      this.isLoading = true;
      await this.menuService.getMenu();

      this.isLoading = false;
    } catch (error) {
      console.log(error);
      this.isLoading = false;
      this.erroDataGeting = true;
    }
  }
}
