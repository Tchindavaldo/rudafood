import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getScreenHeight } from 'src/utils/getScreenHeight';
import { filterByArg } from 'src/utils/filterByArg';
import { OrderDataService } from 'src/services/orders/data/order-data.service';
import { AppState } from 'src/store/indx';

@Component({
  selector: 'app-finished-user-order',
  templateUrl: './finished-user-order.component.html',
  styleUrls: ['./finished-user-order.component.scss'],
})
export class FinishedUserOrderComponent implements OnInit {
  finishOrder!: undefined | any[];
  userOrder!: Observable<any[]>;
  screenHeight: number = getScreenHeight();

  constructor(public ordersService: OrderDataService, private store: Store<AppState>) {
    this.userOrder = this.store.select(state => state.userOrder.orders);
    this.userOrder.subscribe(order => (this.finishOrder = filterByArg(order, 'status', 'finished')));

    // console.log('order finished data', filterByArg(ordersService.getOrderTabs(), 'status', 'finished'));
    // console.log('order finished data');
  }

  ngOnInit() {}
}
