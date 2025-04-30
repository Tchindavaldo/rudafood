import axios from 'axios';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { setFastFoods } from 'src/app/store/fastFood/fastfoods-reducer';

@Injectable({ providedIn: 'root' })
export class getFastFoodsService {
  private apiUrl = environment.apiUrl;
  constructor(private store: Store) {}

  async getFastFoods(): Promise<void> {
    try {
      // console.log('appeeeeeeeeeeeeeeeeeeeeler de la fonction');
      const response = await axios.get(`${this.apiUrl}/fastFood/all`);

      if (response.data && response.status === 200) {
        console.log('fast food récupérées avec succès', response.data);
        this.store.dispatch(setFastFoods({ fastFoodsTab: response.data.data }));
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des fast food:', error);
    }
  }
}
