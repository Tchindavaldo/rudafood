import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getScreenHeight } from 'src/app/utils/getScreenHeight';
import { filterByArg } from 'src/app/utils/filterByArg';
import { OrderDataService } from 'src/app/services/orders/data/order-data.service';
import { AppState } from 'src/app/store/indx';

@Component({
  selector: 'app-processing-user-order',
  templateUrl: './processing-user-order.component.html',
  styleUrls: ['./processing-user-order.component.scss'],
})
export class ProcessingUserOrderComponent implements OnInit {
  proccessOrder = undefined;
  userOrder!: Observable<any[]>;
  screenHeight: number = getScreenHeight(); // Dynamically set screen height

  constructor(public ordersService: OrderDataService, private store: Store<AppState>) {
    this.userOrder = this.store.select(state => state.userOrder.orders);
    this.userOrder.subscribe(order => (this.proccessOrder = filterByArg(order, 'status', 'processing')));

    // console.log('order pending data', filterByArg(ordersService.getOrderTabs(), 'status', 'processing'));
    // console.log('order pproces data');
  }
  ngOnInit() {}
}
