import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getScreenHeight } from 'src/app/services/functions/getScreenHeight';
import { filterByArg } from 'src/app/services/functions/table/filterByArg';
import { getOrdersService } from 'src/app/services/orders/get/get-orders.service';
import { OrderDataService } from 'src/app/services/orders/data/order-data.service';
import { AppState } from 'src/app/store/indx';
@Component({
  selector: 'app-proccess-cmd',
  templateUrl: './proccess-cmd.component.html',
  styleUrls: ['./proccess-cmd.component.scss'],
})
export class ProccessCmdComponent implements OnInit {
  proccessOrder = undefined;
  fastFoodOrder!: Observable<any[]>;
  screenHeight: number = getScreenHeight(); // Dynamically set screen height

  constructor(public ordersService: OrderDataService, private store: Store<AppState>) {
    this.fastFoodOrder = this.store.select(state => state.fastFoodOrder.orders);
    this.fastFoodOrder.subscribe(order => (this.proccessOrder = filterByArg(order, 'status', 'processing')));

    // console.log('order pending data', filterByArg(ordersService.getOrderTabs(), 'status', 'processing'));
    // console.log('order pproces data');
  }

  ngOnInit() {}
}
