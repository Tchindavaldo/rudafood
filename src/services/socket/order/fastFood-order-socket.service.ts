import { Injectable, Injector } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { OrderDataService } from '../../orders/data/order-data.service';
import { environment } from 'src/environments/environment.prod';
import { Store } from '@ngrx/store';
import { addFastFoodOrder, setFastFoodOrder, updateFastFoodOrder } from 'src/store/order/order-fastfood-reducer';
import { setObjectOnTabByArg } from '../../../utils/setObjectOnTabByArg';
import { Observable } from 'rxjs';
import { AppState } from 'src/store/indx';
import { addUserOrderReducer, setUserOrderReducer } from 'src/store/order/order-user-reducer';
import { initSessionSocketService } from '../init-session-socket.service ';

@Injectable({
  providedIn: 'root',
})
export class FastFoodOrderSocketService {
  constructor(private orderData: OrderDataService, private store: Store<AppState>) {}

  public initializeOrderSocket(socket: Socket) {
    socket.on('newFastFoodOrder', (data: any) => {
      console.log('🍔 Nouvelle commande reçue :', data);
      this.store.dispatch(addFastFoodOrder({ order: data.data }));
    });

    socket.on('newFastFoodOrders', (data: any) => {
      console.log('🍔 Nouvelle commande reçue :', data);
      data.data.forEach((order: any) => {
        this.store.dispatch(addFastFoodOrder({ order }));
      });
    });

    socket.on('fastFoodOrderUpdated', (data: any) => {
      console.log('🍔 Commande mise à jour :', data);
      this.store.dispatch(updateFastFoodOrder({ updatedOrder: data.data }));
    });
  }
}
