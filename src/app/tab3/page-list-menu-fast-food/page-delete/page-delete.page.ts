import { AfterContentChecked, Component, OnInit, ViewChild } from '@angular/core';
import { showPages } from 'src/services/showPages';

import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { boisson, Commande, embalage, livraison } from 'src/app/data/cmd';
import { Menu } from 'src/app/data/menu';
import { CardService } from 'src/services/card.service';
import { requeToMenu } from 'src/services/requeToMenu';
import { DataService } from 'src/services/data.service';
import { Router } from '@angular/router';
import { AppState } from 'src/store/indx';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ConfirmMenuDialogComponent } from '../confirm-menu-dialog/confirm-menu-dialog.component';
import { showCard } from 'src/utils/showCard';

@Component({
  selector: 'app-page-delete',
  templateUrl: './page-delete.page.html',
  styleUrls: ['./page-delete.page.scss'],
})
export class PageDeletePage implements OnInit {
  menuTab!: Observable<any>;
  constructor(public dataGet: DataService, private router: Router, private store: Store<AppState>) {}

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

  showDeleteCard() {
    console.log('showDeleteCard clicker');
    showCard('bottom-card-delteMenu');
  }
}
