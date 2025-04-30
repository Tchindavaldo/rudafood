import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getScreenHeight } from 'src/app/services/functions/getScreenHeight';
import { filterByArg } from 'src/app/services/functions/table/filterByArg';
import { OrderDataService } from 'src/app/services/orders/data/order-data.service';
import { AppState } from 'src/app/store/indx';

@Component({
  selector: 'app-pending-user-order',
  templateUrl: './pending-user-order.component.html',
  styleUrls: ['./pending-user-order.component.scss'],
})
export class PendingUserOrderComponent implements OnInit {
  pendingCmd!: any[] | undefined;
  userOrder!: Observable<any[]>; // Utilisation d'un Observable
  screenHeight: number = getScreenHeight(); // Dynamically set screen height

  constructor(public ordersService: OrderDataService, private store: Store<AppState>) {
    this.userOrder = this.store.select(state => state.userOrder.orders);
    this.userOrder.subscribe(order => (this.pendingCmd = filterByArg(order, 'status', 'pending')));

    // console.log('order pending data', filterByArg(ordersService.getOrderTabs(), 'status', 'pending'));
    // console.log('order pending data');
  }
  ngOnInit() {}
}
