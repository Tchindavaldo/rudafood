import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getScreenHeight } from 'src/utils/getScreenHeight';
import { filterByArg } from 'src/utils/filterByArg';
import { OrderDataService } from 'src/services/orders/data/order-data.service';
import { OrderSocketService } from 'src/services/socket/order/order-socket.service';
import { AppState } from 'src/store/indx';
@Component({
  selector: 'app-finish-cmd',
  templateUrl: './finish-cmd.component.html',
  styleUrls: ['./finish-cmd.component.scss'],
})
export class FinishCmdComponent implements OnInit {
  finishOrder!: undefined | any[];
  fastFoodOrder!: Observable<any[]>;
  screenHeight: number = getScreenHeight();

  constructor(public ordersService: OrderDataService, private store: Store<AppState>) {
    this.fastFoodOrder = this.store.select(state => state.fastFoodOrder.orders);
    this.fastFoodOrder.subscribe(order => (this.finishOrder = filterByArg(order, 'status', 'finished')));

    // console.log('order finished data', filterByArg(ordersService.getOrderTabs(), 'status', 'finished'));
    // console.log('order finished data');
  }

  ngOnInit() {}
}
