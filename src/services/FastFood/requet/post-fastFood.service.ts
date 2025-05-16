import axios from 'axios';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { setFastFoods } from 'src/store/fastFood/fastfoods-reducer';
import { UserStorageService } from '../../storgae/user-storage';

@Injectable({ providedIn: 'root' })
export class postFastFoodService {
  private apiUrl = environment.apiUrl;
  constructor(private store: Store, private userStorage: UserStorageService) {}

  async postFastFood(data: any): Promise<any> {
    try {
      const user = await this.userStorage.get('user');
      if (!user || !user.uid) return;

      // console.log('appeeeeeeeeeeeeeeeeeeeeler de la fonction');
      const response = await axios.post(`${this.apiUrl}/fastFood`, { userId: user.uid, ...data });
      return { data: response.data.data, isPosting: false, isError: false };
    } catch (error) {
      console.error('Erreur lors de la creation  du fast food:', error);
      const dataReturn = { data: error, isPosting: false, isError: true };
      return dataReturn;
    }
  }
}
