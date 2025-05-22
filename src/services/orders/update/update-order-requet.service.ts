import { Injectable } from '@angular/core';
import axios from 'axios';
import { FastFood } from '../../../app/data/fastFood';
import { environment } from 'src/environments/environment.prod';
import { UserStorageService } from '../../storgae/user-storage';
import { DataService } from '../../data.service';
import { OrderDataService } from '../data/order-data.service';
import { setFastFoodOrder, updateFastFoodOrder } from 'src/store/order/order-fastfood-reducer';
import { Store } from '@ngrx/store';
import { ToastService } from 'src/services/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class updateOrderRequetService {
  private apiUrl = environment.apiUrl;

  constructor(private userStorage: UserStorageService, private store: Store, private toastService: ToastService) {}

  async updateOrder(order: Object): Promise<void> {
    try {
      // console.log('update fonction called',order);
      // const response = await axios.get(`${this.apiUrl}/order/all/${fastFoodId}`);
      const response = await axios.put(`${this.apiUrl}/order`, order);
      this.toastService.presentToast('top', 'Commande mise à jour avec succès');
      this.store.dispatch(updateFastFoodOrder({ updatedOrder: response.data.data }));
      return response.data.data;
    } catch (error) {
      console.error('update requet order error:', error);
      this.toastService.presentToast('top', 'Erreur lors de la mise à jour de la commande');
      throw error;
    }
  }
}
