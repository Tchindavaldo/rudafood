import axios from 'axios';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { setNotificationReducer } from 'src/store/notification/notification-reducer';
import { UserStorageService } from 'src/services/storgae/user-storage';
import { io } from 'socket.io-client';
import { initSessionSocketService } from 'src/services/socket/init-session-socket.service ';
import { SocketService } from 'src/services/socket/socket.service';

interface NotificationPayload {
  userId: string;
  notificationId: string;
  notificationIdGroup: any;
}

@Injectable({ providedIn: 'root' })
export class markNotificationAsReadService {
  private socket;
  private pendingPayloads: NotificationPayload[] = [];

  constructor(private store: Store, private userStorage: UserStorageService, private initSocket: initSessionSocketService, private SocketService: SocketService) {
    this.socket = this.SocketService.getSocket();

    // 👇 Important : écouter quand socketReady devient "true"
    this.initSocket.socketReady.subscribe(ready => {
      if (ready) {
        this.reEmitBufferedPayloads();
      }
    });
  }

  private reEmitBufferedPayloads() {
    this.pendingPayloads.forEach(payload => {
      this.socket.emit('isReadNotification', payload);
      console.log('✅ Re-emitted isReadNotification for:', payload.notificationId);
    });
    this.pendingPayloads = [];
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
      await axios.put(`${environment.apiUrl}/notification/markAsRead`, payload);
    } catch (error: any) {
      if (error.message === 'Network Error') {
        const alreadyPending = this.pendingPayloads.some(p => p.notificationId === notificationId && p.userId === user.uid && p.notificationIdGroup === notificationIdGroup);
        if (!alreadyPending) {
          this.pendingPayloads.push(payload);
          console.warn('🟡 Notification ajoutée au buffer :', payload.notificationId);
        }
      } else {
        console.error('❌ Erreur API :', error);
      }
    }
  }
}
