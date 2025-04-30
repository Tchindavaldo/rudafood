import { Injectable, Injector } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { OrderDataService } from '../../orders/data/order-data.service';
import { environment } from 'src/environments/environment.prod';
import { Store } from '@ngrx/store';
import { addFastFoodOrder, setFastFoodOrder } from 'src/app/store/order/order-fastfood-reducer';
import { setObjectOnTabByArg } from '../../functions/table/setObjectOnTabByArg';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/indx';
import { addUserOrderReducer, setUserOrderReducer } from 'src/app/store/order/order-user-reducer';
import { initSessionSocketService } from '../init-session-socket.service ';

@Injectable({
  providedIn: 'root',
})
export class OrderSocketService {
  constructor(private orderData: OrderDataService, private store: Store<AppState>) {}

  public initializeOrderSocket(socket: Socket) {
    socket.on('newOrder', (data: any) => {
      console.log('🍔 Nouvelle commande reçue :', data);
      if (this.orderData.getFastfoodOrders() !== null) this.store.dispatch(addFastFoodOrder({ order: data.data }));
      if (this.orderData.getUserOrders() !== null) this.store.dispatch(addUserOrderReducer({ order: data.data }));
    });

    socket.on('updateOrder', (data: any) => {
      console.log('🍔 Nouvelle commande modifier :', data);
      const localUpdateFastFoodOrder = setObjectOnTabByArg(this.orderData.getUserOrders(), data.data, 'id', data.data.id);
      if (this.orderData.getUserOrders() !== null) this.store.dispatch(setUserOrderReducer({ orderTab: localUpdateFastFoodOrder }));
    });
  }
}
