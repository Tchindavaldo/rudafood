import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getScreenHeight } from 'src/utils/getScreenHeight';
import { filterByArg } from 'src/utils/filterByArg';
import { countOrders } from 'src/utils/countOrders';
import { OrderDataService } from 'src/services/orders/data/order-data.service';
import { OrderCountersService } from 'src/services/orders/counters/order-counters.service';
import { AppState } from 'src/store/indx';

@Component({
  selector: 'app-finish-cmd',
  templateUrl: './finish-cmd.component.html',
  styleUrls: ['./finish-cmd.component.scss'],
})
export class FinishCmdComponent implements OnInit, OnDestroy {
  finishOrder!: undefined | any[];
  fastFoodOrder!: Observable<any[]>;
  screenHeight: number = getScreenHeight();
  finishedOrdersCount: number = 0;
  totalAmount: number = 0;

  // Abonnement
  private subscription: Subscription = new Subscription();

  constructor(public ordersService: OrderDataService, private store: Store<AppState>, private orderCountersService: OrderCountersService) {}

  ngOnInit() {
    // S'abonner uniquement aux changements du compteur pour mettre à jour l'UI
    // Le composant parent (commande.page.ts) gère la mise à jour des données
    this.subscription.add(
      this.orderCountersService.finishedOrders$.subscribe(result => {
        this.finishedOrdersCount = result.count;
      })
    );
  }

  ngOnDestroy() {
    // Se désabonner pour éviter les fuites de mémoire
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
