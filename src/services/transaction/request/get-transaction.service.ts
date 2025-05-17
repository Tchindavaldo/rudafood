import axios from 'axios';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { setFastFoods } from 'src/store/fastFood/fastfoods-reducer';
import { UserStorageService } from '../../storgae/user-storage';
import { initTransactionReducer } from 'src/store/transaction/transaction-reducer';

@Injectable({ providedIn: 'root' })
export class getTransactionService {
  private apiUrl = environment.apiUrl;
  constructor(private store: Store, private userStorage: UserStorageService) {}

  async getTransaction(): Promise<any> {
    try {
      const user = await this.userStorage.get('user');
      if (!user || !user.uid) return;

      const response = await axios.get(`${this.apiUrl}/transaction/${user.uid}`, { headers: { 'ngrok-skip-browser-warning': 'true' } });
      this.store.dispatch(initTransactionReducer({ transactions: response.data.data }));

      console.log('appeeeeeeeeeeeeeeeeeeeeler de la fonction', response.data.data);
      const dataReturn = { data: response.data.data, ispending: false, isError: false };

      return dataReturn;
    } catch (error) {
      console.error('Erreur lors de la récupération des transactions:', error);
      const dataReturn = { data: error, ispending: false, isError: true };
      return dataReturn;
    }
  }
}
