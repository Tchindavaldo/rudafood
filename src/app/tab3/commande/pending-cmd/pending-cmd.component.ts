/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getScreenHeight } from 'src/app/services/functions/getScreenHeight';
import { filterByArg } from 'src/app/services/functions/table/filterByArg';
import { OrderDataService } from 'src/app/services/orders/data/order-data.service';
import { AppState } from 'src/app/store/indx';
@Component({
  selector: 'app-pending-cmd',
  templateUrl: './pending-cmd.component.html',
  styleUrls: ['./pending-cmd.component.scss'],
})
export class PendingCmdComponent implements OnInit {
  pendingCmd!: any[] | undefined;
  fastFoodOrder!: Observable<any[]>; // Utilisation d'un Observable
  screenHeight: number = getScreenHeight(); // Dynamically set screen height

  constructor(public ordersService: OrderDataService, private store: Store<AppState>) {
    this.fastFoodOrder = this.store.select(state => state.fastFoodOrder.orders);
    this.fastFoodOrder.subscribe(order => (this.pendingCmd = filterByArg(order, 'status', 'pending')));

    // console.log('order pending data', filterByArg(ordersService.getOrderTabs(), 'status', 'pending'));
    // console.log('order pending data');
  }
  ngOnInit() {}
}
