import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataService } from 'src/services/data.service';
import { setObjectOnTabByArg } from 'src/utils/setObjectOnTabByArg';
import { OrderDataService } from 'src/services/orders/data/order-data.service';
import { updateOrdersRequetService } from 'src/services/orders/update-orders-requet.service';
import { requeToFastFood } from 'src/services/requeToFastFood';
import { AppState } from 'src/store/indx';
import { addFastFoodOrder, setFastFoodOrder, updateFastFoodOrder } from 'src/store/order/order-fastfood-reducer';

@Component({
  selector: 'app-cmd-action',
  templateUrl: './cmd-action.page.html',
  styleUrls: ['./cmd-action.page.scss'],
})
export class CmdActionPage implements OnInit {
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
    console.log('order fastfood reducer', this.isUpdating);
    try {
      await this.updateOrdersRequet.updateFastFood({ status: this.procededAction, id: this.order.id });
      // await this.updateOrdersRequet.updateFastFood({ status: 'pending', id: this.order.id });
      // this.isUpdating = false;
    } catch (error) {
      console.log('error', error);

      this.isUpdating = false;
    }
  }
}
