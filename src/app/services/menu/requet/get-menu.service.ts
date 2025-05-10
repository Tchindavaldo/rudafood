import axios from 'axios';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { setFastFoods } from 'src/app/store/fastFood/fastfoods-reducer';
import { UserStorageService } from '../../storgae/user-storage';

@Injectable({ providedIn: 'root' })
export class getMenuService {
  private apiUrl = environment.apiUrl;
  constructor(private store: Store, private userStorage: UserStorageService) {}

  async getMenu(): Promise<any> {
    try {
      const user = await this.userStorage.get('user');
      if (!user || !user.uid) return;

      // console.log('appeeeeeeeeeeeeeeeeeeeeler de la fonction');
      const response = await axios.get(`${this.apiUrl}/menu/${user.fastFoodId}`, { headers: { 'ngrok-skip-browser-warning': 'true' } });
      const dataReturn = { data: response.data.data, ispending: false, isError: false };
      return dataReturn;
    } catch (error) {
      console.error('Erreur lors de la récupération des fast food:', error);
      const dataReturn = { data: error, ispending: false, isError: true };
      return dataReturn;
    }
  }
}
