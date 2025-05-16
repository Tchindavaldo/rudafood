import { Injectable, Injector } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/indx';
import { notificationDataService } from 'src/services/notifications/data/notification-data.service';
import { markNotificationAsReadReducer } from 'src/store/notification/notification-reducer';

@Injectable({
  providedIn: 'root',
})
export class NotificationSocketService {
  constructor(private notificationData: notificationDataService, private store: Store<AppState>) {}

  public initializeSocket(socket: Socket) {
    socket.on('isRead', (data: any) => {
      const { notificationId, userId } = data;
      console.log('🍔 🍔 🍔 Nouvelle notification lu :', data);
      if (this.notificationData.getNotification() !== null) this.store.dispatch(markNotificationAsReadReducer({ notificationId, userId }));
    });
  }
}
