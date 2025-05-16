import axios from 'axios';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { setFastFoods } from 'src/store/fastFood/fastfoods-reducer';
import { setBonusReducer } from 'src/store/bonus/bonus-reducer';
import { UserStorageService } from '../storgae/user-storage';
import { fcmService } from '../notifications/FCM/fcm.servicce';

@Injectable({ providedIn: 'root' })
export class postBonusRequestService {
  private apiUrl = environment.apiUrl;
  constructor(private store: Store, private userStorage: UserStorageService, private fcm: fcmService) {}

  async postBonusRequest(data: any, totalBonus: any): Promise<any> {
    try {
      const user = await this.userStorage.get('user');
      if (!user || !user.uid) return;
      if (!user.fcmToken) await this.fcm.setupPushNotifications();

      await axios.post(`${this.apiUrl}/bonusRequest/${totalBonus}`, { ...data, userId: user.id, fcmToken: user.fcmToken });
    } catch (error: any) {
      console.error('Erreur lors de la récupération des bonus:', error.response.data);
      throw error.response.data;
    }
  }
}
