import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getScreenHeight } from 'src/utils/getScreenHeight';
import { filterByArg } from 'src/utils/filterByArg';
import { OrderDataService } from 'src/services/orders/data/order-data.service';
import { AppState } from 'src/store/indx';
import { sortByField } from 'src/utils/order-utils';
import { UserOrderCountersService } from 'src/services/orders/counters/User-order-counters.service';

@Component({
  selector: 'app-pending-user-order',
  templateUrl: './pending-user-order.component.html',
  styleUrls: ['./pending-user-order.component.scss'],
})
export class PendingUserOrderComponent implements OnInit {
  pendingCmd!: any[] | undefined;
  screenHeight: number = getScreenHeight(); // Dynamically set screen height

  private subscription: Subscription = new Subscription();
  constructor(private store: Store<AppState>, private orderCountersService: UserOrderCountersService) {}

  ngOnInit() {
    // S'abonner uniquement aux changements du compteur pour mettre à jour l'UI
    // Le composant parent (commande.page.ts) gère la mise à jour des données
    this.subscription.add(
      this.orderCountersService.pendingOrders$.subscribe(result => {
        console.log('pendingCmd', result);
        this.pendingCmd = sortByField(result.filteredOrders || [], 'rank', 'asc');
      })
    );
  }

  ngOnDestroy() {
    // Se désabonner pour éviter les fuites de mémoire
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  // Utilisé pour trackBy
  trackByOrderId(index: number, order: any) {
    return order.id;
  }
}
