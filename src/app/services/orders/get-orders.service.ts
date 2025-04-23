import { Injectable } from '@angular/core';
import axios from 'axios';
import { FastFood } from '../../data/fastFood';
import { environment } from 'src/environments/environment.prod';
import { UserStorageService } from '../storgae/user-storage';
import { DataService } from '../data.service';
import { OrderDataService } from './order-data.service';

@Injectable({
  providedIn: 'root',
})
export class getOrdersService {
  private apiUrl = environment.apiUrl;

  constructor(private userStorage: UserStorageService, private orderData: OrderDataService) {}

  async getFastFoodOrders(): Promise<void> {
    try {
      console.log('appeeeeeeeeeeeeeeeeeeeeler de la fonction');

      const userData = await this.userStorage.get('user');
      if (!userData || !userData.infos || !userData.infos.uid) {
        console.error('Aucun utilisateur connecté');
        return;
      }

      const fastFoodId = userData.infos.fastFoodId;

      // const response = await axios.get(`${this.apiUrl}/order/all/${fastFoodId}`);
      const response = await axios.get(`${this.apiUrl}/order/all/BQZK3Shkp7ECUGMpWI2w`);
      console.log(response.data, 'dddddddddddddddddddddd reposne');

      if (response.data && response.status === 200) {
        console.log('Commandes récupérées avec succès', response.data);
        this.orderData.setOrderTabs(response.data.data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
    }
  }
}
