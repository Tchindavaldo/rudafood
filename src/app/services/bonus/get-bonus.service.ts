import axios from 'axios';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { setFastFoods } from 'src/app/store/fastFood/fastfoods-reducer';
import { setBonusReducer } from 'src/app/store/bonus/bonus-reducer';

@Injectable({ providedIn: 'root' })
export class getBonusService {
  private apiUrl = environment.apiUrl;
  constructor(private store: Store) {}

  async getBonus(): Promise<void> {
    try {
      // console.log('appeeeeeeeeeeeeeeeeeeeeler de la fonction');
      const response = await axios.get(`${this.apiUrl}/bonus/all`, { headers: { 'ngrok-skip-browser-warning': 'true' } });

      if (response.data && response.status === 200) {
        // console.log('bonus récupérées avec succès', response.data);
        this.store.dispatch(setBonusReducer({ bonusTab: response.data.data }));
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des bonus:', error);
    }
  }
}
