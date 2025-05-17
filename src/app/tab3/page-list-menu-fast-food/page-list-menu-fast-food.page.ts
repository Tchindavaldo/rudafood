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

  constructor(private router: Router, private store: Store<AppState>, private menuService: getMenuService) {}
  ngOnInit() {
    this.selectChip('menu');
    this.fetchMenu();
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
