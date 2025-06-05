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
import { OrderDeliveryService } from '../../orders/delivery/order-delivery.service';

@Injectable({
  providedIn: 'root',
})
export class UserOrderSocketService {
  constructor(private orderData: OrderDataService, private store: Store<AppState>, private orderDeliveryService: OrderDeliveryService) {}

  public initializeOrderSocket(socket: Socket) {
    socket.on('newUserOrder', (data: any) => {
      console.log(' Nouvelle commande reçue :', data);
      this.store.dispatch(addUserOrderReducer({ order: data.data }));
    });
    socket.on('newUserOrders', (data: any) => {
      console.log(' Nouvelle commande reçue :', data);
      if (this.orderData.getUserOrders() !== null)
        data.data.forEach((order: any) => {
          this.store.dispatch(addUserOrderReducer({ order }));
        });
    });

    socket.on('userOrderUpdated', (data: any) => {
      console.log('  Commande mise à jour  :', data);
      this.store.dispatch(updateUserOrderReducer({ updatedOrder: data.data }));
    });

    socket.on('newPeriodKeyDelivering', (data: any) => {
      console.log(' Nouvelle periodKey livraison en cours :', data.periodKey);
      if (!this.orderDeliveryService.isPeriodActive(data.periodKey)) {
        this.orderDeliveryService.addActivePeriodKey(data.periodKey);
      }
    });
    socket.on('newClientIdDelivering', (data: any) => {
      console.log(' Nouvelle clientId de livraison en cours :', data.clientId);
      if (!this.orderDeliveryService.isClientActive(data.clientId)) {
        this.orderDeliveryService.addActiveClientId(data.clientId);
      }
    });
  }
}
