import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setObjectOnTabByArg } from 'src/app/services/functions/table/setObjectOnTabByArg';
import { updateOrdersRequetService } from 'src/app/services/orders/update-orders-requet.service';
import { AppState } from 'src/app/store/indx';
import { setFastFoodOrder } from 'src/app/store/order/order-fastfood-reducer';

@Component({
  selector: 'app-user-order-item',
  templateUrl: './user-order-item.component.html',
  styleUrls: ['./user-order-item.component.scss'],
})
export class UserOrderItemComponent implements OnInit {
  @Input() procededAction = '';
  @Input() showedAction = '';
  @Input() order: any = {};
  noDef = 'pas def';

  public isUpdating = false;
  fastfoodOrder!: any[];
  fastFoodOrderReducer!: Observable<any[]>;

  constructor(public updateOrdersRequet: updateOrdersRequetService, private store: Store<AppState>) {
    this.fastFoodOrderReducer = this.store.select(state => state.fastFoodOrder.orders);
    this.fastFoodOrderReducer.subscribe(order => (this.fastfoodOrder = order));
  }
  ngOnInit() {}

  async statutChange() {
    this.isUpdating = true;
    console.log('order fastfood reducer', this.order);
    try {
      const response = await this.updateOrdersRequet.updateFastFood({ ...this.order, status: this.procededAction });
      const dataSet = setObjectOnTabByArg(this.fastfoodOrder, response, 'id', this.order.id);
      this.store.dispatch(setFastFoodOrder({ orderTab: dataSet }));
      console.log('reussite');

      this.isUpdating = false;
    } catch (error) {
      console.log('error', error);

      this.isUpdating = false;
    }
  }
}
