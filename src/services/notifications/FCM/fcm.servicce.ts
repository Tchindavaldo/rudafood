import { PushNotifications } from '@capacitor/push-notifications';
import axios from 'axios';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { setFastFoods } from 'src/store/fastFood/fastfoods-reducer';
import { UserStorageService } from '../../storgae/user-storage';
import { updateUserByIdServices } from '../../user/requet/update-user-byId.services';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // Importation des fonctionnalités Firebase
import { LocalNotifications } from '@capacitor/local-notifications';
import { Router } from '@angular/router';
import { addNotificationReducer } from 'src/store/notification/notification-reducer';
import { notificationDataService } from '../data/notification-data.service';

@Injectable({ providedIn: 'root' })
export class fcmService {
  private apiUrl = environment.apiUrl;

  constructor(
    public notificationData: notificationDataService,
    private updateUserService: updateUserByIdServices,
    private store: Store,
    private userStorage: UserStorageService,
    private router: Router
  ) {}

  async setupPushNotifications() {
    // Récupérer un token non envoyé et tenter de l'envoyer au backend
    const unsentToken = await this.userStorage.get('unsentFcmToken');
    if (unsentToken) {
      try {
        await this.sendTokenToBackend(unsentToken);
        await this.userStorage.remove('unsentFcmToken');
      } catch (e) {
        console.warn('Échec du renvoi du token FCM stocké localement:', e);
      }
    }

    // Demander la permission pour les notifications
    try {
      const permissionStatus = await PushNotifications.requestPermissions();
      if (permissionStatus.receive === 'granted') {
        // Enregistrer l'appareil pour recevoir des notifications push
        await PushNotifications.register();
      } else {
        console.warn('Permission pour les notifications push refusée');
        return;
      }
    } catch (error) {
      console.error('Erreur lors de la demande de permission pour les notifications:', error);
      return; // Early exit if permission request fails
    }

    // Vérifier si un token FCM existe déjà pour l'utilisateur
    const user = await this.userStorage.get('user');
    console.log('utilisateur obtenu', JSON.stringify(user, null, 2));

    const existingToken = user?.fcmToken;

    // Ajouter un écouteur pour récupérer le token FCM après enregistrement
    PushNotifications.addListener('registration', token => {
      console.log('Token FCM enregistré:', token.value);

      // Si le token a changé ou s'il n'est pas encore stocké, l'envoyer au backend
      if (!existingToken || token.value !== existingToken) {
        this.sendTokenToBackend(token.value);
      }
    });

    // Gérer les notifications reçues
    PushNotifications.addListener('pushNotificationReceived', async notification => {
      console.log('notification reçue:', notification);
      const data = notification.data;
      const newNotif: any = {};

      if (data.id !== undefined) newNotif.id = data.id;
      if (data.title !== undefined) newNotif.title = data.title;
      if (data.body !== undefined) newNotif.body = data.body;

      if (data.type !== undefined) newNotif.type = data.type;
      if (data.target !== undefined) newNotif.target = data.target;

      if (data.userId !== undefined) newNotif.userId = data.userId;
      if (data.fastFoodId !== undefined) newNotif.fastFoodId = data.fastFoodId;

      if (data.isRead !== undefined) newNotif.isRead = JSON.parse(data.isRead);
      if (data.createdAt !== undefined) newNotif.createdAt = data.createdAt;
      if (data.updatedAt !== undefined) newNotif.updatedAt = data.updatedAt;

      if (this.notificationData.getNotification() != null) this.store.dispatch(addNotificationReducer({ Notification: newNotif }));

      const notificationId = Math.floor(Math.random() * 100000);
      LocalNotifications.schedule({
        notifications: [
          {
            id: notificationId,
            title: notification.title || 'tire',
            body: notification.body ?? 'No content available',
            schedule: { at: new Date(Date.now() + 100) },
            channelId: 'high_priority_channel', // 👈 DOIT correspondre à ton ID Java
            sound: 'default', // 👈 Active le heads-up
            smallIcon: 'ic_launcher',
            iconColor: '#FF0000',
            extra: notification.data,
          },
        ],
      });
    });

    // Gérer les actions de notification (clic sur notification)
    PushNotifications.addListener('pushNotificationActionPerformed', action => {
      console.log('Action de notification :', action);
      console.log('data de fcm notification click :', action.notification.data);

      const data = action.notification.data;
      const newNotif: any = {};

      if (data.id !== undefined) newNotif.id = data.id;
      if (data.title !== undefined) newNotif.title = data.title;
      if (data.body !== undefined) newNotif.body = data.body;

      if (data.type !== undefined) newNotif.type = data.type;
      if (data.target !== undefined) newNotif.target = data.target;

      if (data.userId !== undefined) newNotif.userId = data.userId;
      if (data.fastFoodId !== undefined) newNotif.fastFoodId = data.fastFoodId;

      if (data.isRead !== undefined) newNotif.isRead = JSON.parse(data.isRead);
      if (data.createdAt !== undefined) newNotif.createdAt = data.createdAt;
      if (data.updatedAt !== undefined) newNotif.updatedAt = data.updatedAt;

      if (this.notificationData.getNotification() != null) this.store.dispatch(addNotificationReducer({ Notification: newNotif }));
      this.router.navigateByUrl('/tabs/tab4');
    });

    // Quand une notif locale est cliquée
    LocalNotifications.addListener('localNotificationActionPerformed', event => {
      console.log('Action sur notification locale :', event);
      console.log('data de local notification click :', event.notification.extra);

      const data = event.notification.extra;
      const newNotif: any = {};

      if (data.id !== undefined) newNotif.id = data.id;
      if (data.title !== undefined) newNotif.title = data.title;
      if (data.body !== undefined) newNotif.body = data.body;

      if (data.type !== undefined) newNotif.type = data.type;
      if (data.target !== undefined) newNotif.target = data.target;

      if (data.userId !== undefined) newNotif.userId = data.userId;
      if (data.fastFoodId !== undefined) newNotif.fastFoodId = data.fastFoodId;

      if (data.isRead !== undefined) newNotif.isRead = JSON.parse(data.isRead);
      if (data.createdAt !== undefined) newNotif.createdAt = data.createdAt;
      if (data.updatedAt !== undefined) newNotif.updatedAt = data.updatedAt;

      if (this.notificationData.getNotification() != null) this.store.dispatch(addNotificationReducer({ Notification: newNotif }));
      this.router.navigateByUrl('/tabs/tab4');
    });
  }

  // Envoi du token FCM au backend
  async sendTokenToBackend(token: string) {
    try {
      //9fa8-2c0f-2a80-90e-1e10-00-bab.ngrok-free.app
      await this.updateUserService.updateUserById({ fcmToken: token });

      const userbeforUpdate = await this.userStorage.get('user');
      console.log('Token envoyé avec succès au backend');
      await this.userStorage.set('user', { ...userbeforUpdate, fcmToken: token });

      const user = await this.userStorage.get('user');
      console.log('utilisateur obtenu', JSON.stringify(user, null, 2));
    } catch (error) {
      console.error("Erreur d'envoi du token FCM au backend:", error);
      // 🔁 Optionnel : stocker le token dans le localStorage pour réessayer plus tard
      this.userStorage.set('unsentFcmToken', token);
    }
  }
}
