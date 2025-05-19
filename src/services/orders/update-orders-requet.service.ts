import { Injectable } from '@angular/core';
import axios from 'axios';
import { FastFood } from '../../app/data/fastFood';
import { environment } from 'src/environments/environment.prod';
import { UserStorageService } from '../storgae/user-storage';
import { DataService } from '../data.service';
import { OrderDataService } from './data/order-data.service';
import { setFastFoodOrder, updateFastFoodOrder } from 'src/store/order/order-fastfood-reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class updateOrdersRequetService {
  private apiUrl = environment.apiUrl;

  constructor(private userStorage: UserStorageService, private store: Store) {}

  async updateFastFood(order: Object): Promise<void> {
    try {
      // console.log('update fonction called',order);
      // const response = await axios.get(`${this.apiUrl}/order/all/${fastFoodId}`);
      const response = await axios.put(`${this.apiUrl}/order`, order);
      this.store.dispatch(updateFastFoodOrder({ updatedOrder: response.data.data }));
      return response.data.data;
    } catch (error) {
      console.error('update requet order error:', error);
      throw error;
    }
  }
}
