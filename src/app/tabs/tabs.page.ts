import { Component, OnInit } from '@angular/core';
import { IonLabel, NavController, Platform, ToastButton, ToastController } from '@ionic/angular';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import { DataService } from '../services/data.service';
import { NavigationEnd, Router } from '@angular/router';
import { SocketService } from '../services/socket/socket.service';
import { fcmService } from '../services/notifications/FCM/fcm.servicce';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  allLabel!: HTMLCollectionOf<HTMLIonLabelElement>;
  currentUrl: string = '';
  constructor(private platform: Platform, private socketService: SocketService, private fcmService: fcmService, private router: Router) {
    socketService.initializeAllSockets();
    fcmService.setupPushNotifications();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
      }
    });
  }

  ngOnInit(): void {
    // this.platform.ready().then(() => {
    //  LocalNotifications.createChannel({
    //    id: 'default',
    //    name: 'Notifications importantes',
    //    description: "Notifications avec alerte en tête d'écran",
    //    importance: 5, // IMPORTANCE_HIGH (5) - Force l'affichage en bulle
    //    visibility: 1, // PUBLIC - Visible sur écran verrouillé
    //    // Paramètres additionnels
    //    sound: 'default',
    //    vibration: true,
    //    lights: true,
    //    lightColor: '#FF0000', // Rouge
    //    // Ces paramètres supplémentaires renforcent la notification en bulle
    //   })
    //    .then(() => {
    //      console.log('Canal high priority créé avec succès');
    //    })
    //    .catch(err => {
    //      console.error('Erreur création canal:', err);
    //    });
    // });

    LocalNotifications.createChannel({
      id: 'default',
      name: 'Notifications',
      importance: 4, // HIGH
      sound: 'default',
    });
    console.log('tasss a  charger');
  }

  shouldHideElement(): boolean {
    return this.currentUrl.includes('menu/new-menu');
  }
}
