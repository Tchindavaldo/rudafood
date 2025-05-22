import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment.prod';
import { setFastFoodOrder, updateFastFoodOrder } from 'src/store/order/order-fastfood-reducer';
import { Store } from '@ngrx/store';
import { UserStorageService } from '../../storgae/user-storage';
import { ToastService } from 'src/services/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class updateOrdersRequetService {
  private apiUrl = environment.apiUrl;

  constructor(private store: Store, private userStorage: UserStorageService, private toastService: ToastService) {}

  async updateOrders(order: Object): Promise<void> {
    try {
      // console.log('update fonction called',order);
      // const response = await axios.get(`${this.apiUrl}/order/all/${fastFoodId}`);
      const user = await this.userStorage.get('user');
      const response = await axios.put(`${this.apiUrl}/order/tabs/${user.uid}`, order);

      this.toastService.presentToast('top', 'Commande mise à jour avec succès');

      this.store.dispatch(updateFastFoodOrder({ updatedOrder: response.data.data }));
      console.log(response.data, 'update requet reposne', response);
      return response.data.data;
    } catch (error) {
      this.toastService.presentToast('top', 'Erreur lors de la mise à jour de la commande');
      console.error('update requet order error:', error);
      throw error;
    }
  }
}
