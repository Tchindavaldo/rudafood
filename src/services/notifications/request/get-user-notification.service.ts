import axios from 'axios';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { setNotificationReducer } from 'src/store/notification/notification-reducer';
import { UserStorageService } from 'src/services/storgae/user-storage';

@Injectable({ providedIn: 'root' })
export class getUserNotificationService {
  private apiUrl = environment.apiUrl;
  constructor(private store: Store, private userStorage: UserStorageService) {}

  async getNotification(): Promise<void> {
    try {
      let endpoint;
      const user = await this.userStorage.get('user');
      if (!user || !user.uid) return;

      endpoint = user.fastFoodId !== undefined ? `/user?userId=${user.uid}&fastFoodId=${user.fastFoodId}` : `/user?userId=${user.uid}`;
      const response = await axios.get(
        `${this.apiUrl}/notification${endpoint}`
        // { headers: { 'ngrok-skip-browser-warning': 'true' } }
      );

      console.log('notification récupérées avec succès', response.data);
      this.store.dispatch(setNotificationReducer({ NotificationTab: response.data.data }));
    } catch (error) {
      console.error('Erreur lors de la récupération des notification:', error);
    }
  }
}
