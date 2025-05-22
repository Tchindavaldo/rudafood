import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderDataService } from 'src/services/orders/data/order-data.service';
import { getUserOrdersService } from 'src/services/orders/get/get-user-orders.service';
import { updateOrdersService } from 'src/services/orders/update/update-orders.service';
import { AppState } from 'src/store/indx';
import { filterByArg } from 'src/utils/filterByArg';

@Component({
  selector: 'app-pending-order-to-buy',
  templateUrl: './pending-order-to-buy.component.html',
  styleUrls: ['./pending-order-to-buy.component.scss'],
})
export class PendingOrderToBuyComponent implements OnInit {
  pendingToBuyOrder!: any;
  userOrder!: Observable<any[]>;

  constructor(
    private store: Store<AppState>,
    private updatePendingOrderService: updateOrdersService,
    public orderData: OrderDataService,
    private getUserOrdersService: getUserOrdersService
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  async fetchData() {
    try {
      console.log('order  data', this.orderData.getUserOrders());
      if (this.orderData.getUserOrders() === null) await this.getUserOrdersService.getFastUserOrders();

      this.userOrder = this.store.select(state => state.userOrder.orders);
      this.userOrder.subscribe(order => (this.pendingToBuyOrder = filterByArg(order, 'status', 'pendingToBuy')));

      // this.pendingToBuyOrder = filterByArg(this.orderData.getUserOrders(), 'status', 'pendingToBuy');
      // console.log('order  data', this.orderData.getUserOrders());
    } catch (error) {
      console.error('Erreur', error);
    }
  }

  updatePendingOrder() {
    console.log('click updaye appeler');
    this.updatePendingOrderService.updateOrders(this.pendingToBuyOrder);
  }
}
