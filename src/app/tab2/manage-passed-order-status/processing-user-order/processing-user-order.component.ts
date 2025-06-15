import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getScreenHeight } from 'src/utils/getScreenHeight';
import { sortByField } from 'src/utils/order-utils';
import { UserOrderCountersService } from 'src/services/orders/counters/User-order-counters.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-processing-user-order',
  templateUrl: './processing-user-order.component.html',
  styleUrls: ['./processing-user-order.component.scss'],
})
export class ProcessingUserOrderComponent implements OnInit {
  proccessOrder: any[] | undefined;
  screenHeight: number = getScreenHeight(); // Dynamically set screen height

  private subscription: Subscription = new Subscription();
  constructor(private orderCountersService: UserOrderCountersService) {}

  ngOnInit() {
    // S'abonner uniquement aux changements du compteur pour mettre à jour l'UI
    // Le composant parent (commande.page.ts) gère la mise à jour des données
    this.subscription.add(
      this.orderCountersService.processingOrders$.subscribe(result => {
        console.log('pendingCmd', result);
        this.proccessOrder = sortByField(result.filteredOrders || [], 'rank', 'asc');
      })
    );
  }

  ngOnDestroy() {
    // Se désabonner pour éviter les fuites de mémoire
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  trackByOrderId(index: number, order: any) {
    return order.id;
  }
}
