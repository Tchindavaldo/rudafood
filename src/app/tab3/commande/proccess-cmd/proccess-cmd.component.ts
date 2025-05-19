import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getScreenHeight } from 'src/utils/getScreenHeight';
import { filterByArg } from 'src/utils/filterByArg';
import { countOrders, OrderCountResult } from 'src/utils/countOrders';
import { getOrdersService } from 'src/services/orders/get/get-orders.service';
import { OrderDataService } from 'src/services/orders/data/order-data.service';
import { OrderCountersService } from 'src/services/orders/counters/order-counters.service';
import { AppState } from 'src/store/indx';
@Component({
  selector: 'app-proccess-cmd',
  templateUrl: './proccess-cmd.component.html',
  styleUrls: ['./proccess-cmd.component.scss'],
})
export class ProccessCmdComponent implements OnInit, OnDestroy {
  proccessOrder: any[] = [];
  fastFoodOrder!: Observable<any[]>;
  screenHeight: number = getScreenHeight(); // Dynamically set screen height
  processingOrdersCount: number = 0;
  totalAmount: number = 0;
  result!: OrderCountResult;

  // Abonnement
  private subscription: Subscription = new Subscription();

  constructor(public ordersService: OrderDataService, private store: Store<AppState>, private orderCountersService: OrderCountersService) {}

  ngOnInit() {
    // S'assurer que this.result est défini avant de l'utiliser dans le deuxième abonnement
    this.subscription.add(
      this.orderCountersService.processingOrders$.subscribe(result => {
        this.proccessOrder = result.filteredOrders;
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
