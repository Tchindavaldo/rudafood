import axios from 'axios';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { setNotificationReducer } from 'src/store/notification/notification-reducer';
import { UserStorageService } from 'src/services/storgae/user-storage';
import { io } from 'socket.io-client';

interface NotificationPayload {
  userId: string;
  notificationId: string;
  notificationIdGroup: any;
}

@Injectable({ providedIn: 'root' })
export class markNotificationAsReadService {
  private apiUrl = environment.apiUrl;
  private socket = io(this.apiUrl);
  private pendingPayloads: NotificationPayload[] = [];

  constructor(private store: Store, private userStorage: UserStorageService) {
    this.socket.on('connect', () => {
      this.pendingPayloads.forEach(payload => {
        this.socket.emit('isReadNotification', payload);
        console.log('Re-emitted isReadNotification for:', payload.notificationId);
      });
      this.pendingPayloads = [];
    });
  }

  async markNotificationAsRead(notificationId: string, notificationIdGroup: any) {
    const user = await this.userStorage.get('user');
    if (!user?.uid) return;

    const payload: NotificationPayload = {
      userId: user.uid,
      notificationId,
      notificationIdGroup,
    };

    try {
      await axios.put(`${this.apiUrl}/notification/markAsRead`, payload);
    } catch (error: any) {
      if (error.message === 'Network Error') {
        const alreadyPending = this.pendingPayloads.some(p => p.notificationId === notificationId && p.userId === user.uid && p.notificationIdGroup === notificationIdGroup);
        if (!alreadyPending) {
          this.pendingPayloads.push(payload);
          console.warn('Ajout au buffer de reconnexion :', payload.notificationId);
        } else {
          console.log('Payload déjà en attente, non ajouté à nouveau :', payload.notificationId);
        }
      } else {
        console.error('Erreur non liée au réseau :', error);
      }
    }
  }
}
