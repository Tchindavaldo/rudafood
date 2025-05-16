import { Injectable } from '@angular/core';
import axios from 'axios';
import { FastFood } from '../../../app/data/fastFood';
import { environment } from 'src/environments/environment.prod';
import { UserStorageService } from '../../storgae/user-storage';
import { DataService } from '../../data.service';
import { OrderDataService } from '../data/order-data.service';
import { setFastFoodOrder } from 'src/store/order/order-fastfood-reducer';
import { Store } from '@ngrx/store';
import { setUserOrderReducer } from 'src/store/order/order-user-reducer';

@Injectable({
  providedIn: 'root',
})
export class getOrdersService {
  private apiUrl = environment.apiUrl;

  constructor(private userStorage: UserStorageService, private orderData: OrderDataService, private store: Store) {}

  async getFastFoodOrders(): Promise<void> {
    try {
      // console.log('appeeeeeeeeeeeeeeeeeeeeler de la fonction');
      const user = await this.userStorage.get('user');
      if (!user || !user.uid) return;

      // const response = await axios.get(`${this.apiUrl}/order/all/${fastFoodId}`);
      const response = await axios.get(`${this.apiUrl}/order/all/${user.fastFoodId}`, { headers: { 'ngrok-skip-browser-warning': 'true' } });
      this.store.dispatch(setFastFoodOrder({ orderTab: response.data.data }));
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
    }
  }
}
