import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getScreenHeight } from 'src/utils/getScreenHeight';
import { filterByArg } from 'src/utils/filterByArg';
import { OrderDataService } from 'src/services/orders/data/order-data.service';
import { AppState } from 'src/store/indx';
import { sortByField } from 'src/utils/order-utils';

@Component({
  selector: 'app-processing-user-order',
  templateUrl: './processing-user-order.component.html',
  styleUrls: ['./processing-user-order.component.scss'],
})
export class ProcessingUserOrderComponent implements OnInit {
  proccessOrder: any[] | undefined;
  userOrder!: Observable<any[]>;
  screenHeight: number = getScreenHeight(); // Dynamically set screen height

  constructor(public ordersService: OrderDataService, private store: Store<AppState>) {
    this.userOrder = this.store.select(state => state.userOrder.orders);
    this.userOrder.subscribe(order => (this.proccessOrder = sortByField(filterByArg(order, 'status', 'processing'), 'rank', 'asc')));

    // console.log('order pending data', filterByArg(ordersService.getOrderTabs(), 'status', 'processing'));
    // console.log('order pproces data');
  }
  ngOnInit() {}
  trackByOrderId(index: number, order: any) {
    return order.id;
  }
}
