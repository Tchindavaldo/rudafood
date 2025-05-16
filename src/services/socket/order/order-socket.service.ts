import { Injectable, Injector } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { OrderDataService } from '../../orders/data/order-data.service';
import { environment } from 'src/environments/environment.prod';
import { Store } from '@ngrx/store';
import { addFastFoodOrder, setFastFoodOrder } from 'src/store/order/order-fastfood-reducer';
import { setObjectOnTabByArg } from '../../../utils/setObjectOnTabByArg';
import { Observable } from 'rxjs';
import { AppState } from 'src/store/indx';
import { addUserOrderReducer, setUserOrderReducer } from 'src/store/order/order-user-reducer';
import { initSessionSocketService } from '../init-session-socket.service ';

@Injectable({
  providedIn: 'root',
})
export class OrderSocketService {
  constructor(private orderData: OrderDataService, private store: Store<AppState>) {}

  public initializeOrderSocket(socket: Socket) {
    socket.on('newUserOrder', (data: any) => {
      console.log('🍔 Nouvelle commande reçue :', data);
      if (this.orderData.getUserOrders() !== null) this.store.dispatch(addUserOrderReducer({ order: data.data }));
    });

    socket.on('newFastFoodOrder', (data: any) => {
      console.log('🍔 Nouvelle commande reçue :', data);
      if (this.orderData.getFastfoodOrders() !== null) this.store.dispatch(addFastFoodOrder({ order: data.data }));
    });

    socket.on('newFastFoodOrders', (data: any) => {
      console.log('🍔 Nouvelle commande reçue :', data);
      if (this.orderData.getFastfoodOrders() !== null)
        data.data.forEach((order: any) => {
          this.store.dispatch(addFastFoodOrder({ order }));
        });
    });

    socket.on('updateOrder', (data: any) => {
      console.log('🍔 Nouvelle commande modifier :', data);
      const localUpdateFastFoodOrder = setObjectOnTabByArg(this.orderData.getUserOrders(), data.data, 'id', data.data.id);
      if (this.orderData.getUserOrders() !== null) this.store.dispatch(setUserOrderReducer({ orderTab: localUpdateFastFoodOrder }));
    });
  }
}
