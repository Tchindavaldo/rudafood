import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/indx';
// Removed deprecated import of isArray

@Injectable({
  providedIn: 'root',
})
export class OrderDataService {
  private fastFoodOrder!: any[];
  private userOrder!: any[];

  constructor(private store: Store<AppState>) {
    this.store.select(state => state.userOrder.orders).subscribe(order => (this.userOrder = order));
    this.store.select(state => state.fastFoodOrder.orders).subscribe(order => (this.fastFoodOrder = order));
  }

  getUserOrders = () => this.userOrder;
  getFastfoodOrders = () => this.fastFoodOrder;
}
