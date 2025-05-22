import { Injectable, Injector } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { OrderDataService } from '../../orders/data/order-data.service';
import { environment } from 'src/environments/environment.prod';
import { Store } from '@ngrx/store';
import { addFastFoodOrder, setFastFoodOrder } from 'src/store/order/order-fastfood-reducer';
import { setObjectOnTabByArg } from '../../../utils/setObjectOnTabByArg';
import { Observable } from 'rxjs';
import { AppState } from 'src/store/indx';
import { addUserOrderReducer, setUserOrderReducer, updateUserOrderReducer } from 'src/store/order/order-user-reducer';
import { initSessionSocketService } from '../init-session-socket.service ';

@Injectable({
  providedIn: 'root',
})
export class UserOrderSocketService {
  constructor(private orderData: OrderDataService, private store: Store<AppState>) {}

  public initializeOrderSocket(socket: Socket) {
    socket.on('newUserOrder', (data: any) => {
      console.log('🍔 Nouvelle commande reçue :', data);
      this.store.dispatch(addUserOrderReducer({ order: data.data }));
    });

    socket.on('newUserOrders', (data: any) => {
      console.log('🍔 Nouvelle commande reçue :', data);
      if (this.orderData.getUserOrders() !== null)
        data.data.forEach((order: any) => {
          this.store.dispatch(addUserOrderReducer({ order }));
        });
    });

    socket.on('userOrderUpdated', (data: any) => {
      console.log(' 🍔 Commande mise à jour  :', data);
      this.store.dispatch(updateUserOrderReducer({ updatedOrder: data.data }));
    });
  }
}
