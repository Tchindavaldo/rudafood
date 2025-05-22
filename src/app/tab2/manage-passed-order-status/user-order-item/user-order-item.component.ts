import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/store/indx';

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

  constructor(private store: Store<AppState>) {
    this.fastFoodOrderReducer = this.store.select(state => state.fastFoodOrder.orders);
    this.fastFoodOrderReducer.subscribe(order => (this.fastfoodOrder = order));
  }
  ngOnInit() {}

  async statutChange() {
    this.isUpdating = true;
    console.log('order fastfood reducer', this.order);
    try {
      // const response = await this.updateOrdersRequet.updateFastFood({ ...this.order, status: this.procededAction });
      // const dataSet = setObjectOnTabByArg(this.fastfoodOrder, response, 'id', this.order.id);
      // this.store.dispatch(setFastFoodOrder({ orderTab: dataSet }));
      console.log('reussite');

      this.isUpdating = false;
    } catch (error) {
      console.log('error', error);

      this.isUpdating = false;
    }
  }
}
