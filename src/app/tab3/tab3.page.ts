import { Component } from '@angular/core';
import { Users } from '../data/Users';
import { NavigationEnd, Router } from '@angular/router';
import { ToastButton, ToastController } from '@ionic/angular';
import { updateOrdersRequetService } from 'src/services/FastFood/requet/update-orders-requet.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

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

  loading$ = this.updateOrdersRequet.loading$;

  showLoader$ = combineLatest([this.updateOrdersRequet.loading$, this.router.events.pipe(map(() => this.router.url.includes('/commande/finish')))]).pipe(
    map(([loading, isFinishCmd]) => loading && isFinishCmd)
  );

  constructor(private router: Router, private updateOrdersRequet: updateOrdersRequetService) {
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
