import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment.prod';
import { setFastFoodOrder } from 'src/store/order/order-fastfood-reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class updateOrdersRequetService {
  private apiUrl = environment.apiUrl;

  constructor(private store: Store) {}

  async updateFastFood(order: Object): Promise<void> {
    try {
      // console.log('update fonction called',order);
      // const response = await axios.get(`${this.apiUrl}/order/all/${fastFoodId}`);
      const response = await axios.put(`${this.apiUrl}/order`, order);
      console.log(response.data, 'update requet reposne', response);
      return response.data.data;
    } catch (error) {
      console.error('update requet order error:', error);
      throw error;
    }
  }
}
