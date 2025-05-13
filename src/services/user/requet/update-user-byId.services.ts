import axios from 'axios';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { setFastFoods } from 'src/app/store/fastFood/fastfoods-reducer';
import { UserStorageService } from '../../storgae/user-storage';

@Injectable({ providedIn: 'root' })
export class updateUserByIdServices {
  private apiUrl = environment.apiUrl;
  constructor(private store: Store, private userStorage: UserStorageService) {}

  async updateUserById(data: any): Promise<object | undefined> {
    try {
      // console.log('appeeeeeeeeeeeeeeeeeeeeler de la fonction');

      const user = await this.userStorage.get('user');
      const response = await axios.put(`${this.apiUrl}/user/${user.uid}`, data);

      await this.userStorage.set('user', { ...user, ...data });

      return response.data.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des utiliateur:', error);
      throw error;
    }
  }
}
