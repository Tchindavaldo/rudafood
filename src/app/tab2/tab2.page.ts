import { AfterContentChecked, AfterViewChecked, Component, OnInit } from '@angular/core';
import { Commande } from '../data/cmd';
import { DataService } from '../../services/data.service';
import { requeToFastFood } from '../../services/requeToFastFood';
import { requeToUser } from '../../services/requeToUser';
import { FastFood } from '../data/fastFood';
import { Users } from '../data/Users';
import { showLoaderToast } from '../../services/showLoaderToast';
import { userOrderRouteAnimation } from '../animations/user-order-route-animations';
import { NavigationEnd, Router } from '@angular/router';
import { AppState } from 'src/store/indx';
import { Store } from '@ngrx/store';
import { filterByArg } from 'src/utils/filterByArg';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  animations: [userOrderRouteAnimation],
})
export class Tab2Page {
  currentUrl: string = '';

  pendingToBuyOrder!: any;
  userOrder!: Observable<any[]>;
  constructor(private router: Router, private store: Store<AppState>) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
      }
    });

    this.store.select(state => state.userOrder.orders).subscribe(order => (this.pendingToBuyOrder = filterByArg(order || [], 'status', 'pendingToBuy')));
  }

  calculateTotal(): number {
    return this.pendingToBuyOrder?.reduce((total: number, order: any) => total + (order.total || 0), 0) || 0;
  }

  isOnPendingOrderToBuy(): boolean {
    return this.currentUrl.includes('pending-order-toBuy');
  }

  shouldHideElement(): boolean {
    return this.currentUrl.includes('bonus');
  }
}
