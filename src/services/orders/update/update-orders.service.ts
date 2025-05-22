import { Injectable } from '@angular/core';
import axios from 'axios';
import { FastFood } from '../../../app/data/fastFood';
import { environment } from 'src/environments/environment.prod';
import { Store } from '@ngrx/store';
import { UserStorageService } from '../../storgae/user-storage';
import { OrderDataService } from '../data/order-data.service';
import { setObjectOnTabByArg } from 'src/utils/setObjectOnTabByArg';
import { setUserOrderReducer } from 'src/store/order/order-user-reducer';

@Injectable({
  providedIn: 'root',
})
export class updateOrdersService {
  private apiUrl = environment.apiUrl;

  constructor(private orderData: OrderDataService, private userStorage: UserStorageService, private store: Store) {}

  async updateOrders(data: any): Promise<any> {
    try {
      const user = await this.userStorage.get('user');
      if (!user || !user.uid) {
        console.error('Aucun utilisateur connecté');
        return;
      }
      const ordersWithUserId = data.map((order: any) => ({
        ...order,
        userId: user.uid,
      }));

      const response = await axios.put(`${this.apiUrl}/order/tabs/${user.uid}`, ordersWithUserId);

      response.data.data.forEach((updatedOrder: any) => {
        const updatedOrders = setObjectOnTabByArg(this.orderData.getUserOrders(), updatedOrder, 'id', updatedOrder.id);

        if (this.orderData.getUserOrders() !== null) {
          this.store.dispatch(setUserOrderReducer({ orderTab: updatedOrders }));
        }
      });

      return { data: response.data.data, isPosting: false, isError: false };
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
      return { data: error, isPosting: false, isError: true };
    }
  }
}
