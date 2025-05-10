import { Injectable } from '@angular/core';
import axios from 'axios';
import { FastFood } from '../../../data/fastFood';
import { environment } from 'src/environments/environment.prod';
import { Store } from '@ngrx/store';
import { UserStorageService } from '../../storgae/user-storage';

@Injectable({
  providedIn: 'root',
})
export class PostOrdersService {
  private apiUrl = environment.apiUrl;

  constructor(private userStorage: UserStorageService, private store: Store) {}

  async postOrder(data: any): Promise<any> {
    try {
      const user = await this.userStorage.get('user');
      if (!user || !user.uid) {
        console.error('Aucun utilisateur connecté');
        return;
      }

      const response = await axios.post(`${this.apiUrl}/order`, { ...data, userId: user.uid });
      return { data: response.data.data, isPosting: false, isError: false };
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
      return { data: error, isPosting: false, isError: true };
    }
  }
}
