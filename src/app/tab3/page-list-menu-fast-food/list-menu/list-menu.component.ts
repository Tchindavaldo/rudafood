import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FastFood } from 'src/app/data/fastFood';
import { Menu } from 'src/app/data/menu';
import { CardService } from 'src/services/card.service';
import { DataService } from 'src/services/data.service';
import { getMenuService } from 'src/services/menu/requet/get-menu.service';
import { requeToFastFood } from 'src/services/requeToFastFood';
import { requeToMenu } from 'src/services/requeToMenu';
import { showLoaderToast } from 'src/services/showLoaderToast';
import { showPages } from 'src/services/showPages';
import { showCardTranslateY } from 'src/utils/showCard';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/indx';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.scss'],
})
export class ListMenuComponent implements OnInit {
  menuTab!: Observable<any>;
  ispending = true;
  erroDataGeting = false;

  constructor(private store: Store<AppState>, private router: Router) {}
  ngOnInit() {
    this.fetchMenu();
  }

  redirect(path: string) {
    this.router.navigate([path]);
  }
  fetchMenu = async () => {
    this.menuTab = this.store.select(state => state.menu.menuTab);
  };

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
