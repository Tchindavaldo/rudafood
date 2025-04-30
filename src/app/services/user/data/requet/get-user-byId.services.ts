import axios from 'axios';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { setFastFoods } from 'src/app/store/fastFood/fastfoods-reducer';

@Injectable({ providedIn: 'root' })
export class getUserByIdServices {
  private apiUrl = environment.apiUrl;
  constructor(private store: Store) {}

  async getUserById(userId: any): Promise<object | undefined> {
    try {
      // console.log('appeeeeeeeeeeeeeeeeeeeeler de la fonction');
      const response = await axios.get(`${this.apiUrl}/user/${userId}`);
      return response.data.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des utiliateur:', error);
      throw error;
    }
  }
}
