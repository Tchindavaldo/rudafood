import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderDataService {
  private orderTabs: any;

  getOrderTabs(): [{}] {
    return this.orderTabs;
  }

  addOrderTabs(newOrder: any): void {
    this.orderTabs.unshift(newOrder);
  }

  setOrderTabs(newOrderTab: any): void {
    this.orderTabs = newOrderTab;
  }
}
