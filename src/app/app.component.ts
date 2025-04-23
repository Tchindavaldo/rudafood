import { Component, HostListener } from '@angular/core';
import { Platform } from '@ionic/angular';
import { io, Socket } from 'socket.io-client';
import { OrderDataService } from './services/orders/order-data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private socket!: Socket;

  constructor(private platform: Platform, private ordersService: OrderDataService) {
    this.initializeApp();
    this.initializeSocket();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Forcer le thème light
      document.body.classList.add('light-theme');
      // S'assurer que le mode sombre n'est pas activé
      document.body.classList.remove('dark');
    });
  }

  private initializeSocket() {
    // this.socket = io('http://localhost:5000');
    this.socket = io('https://yaammoo-backend-production.up.railway.app');

    this.socket.on('connect', () => {
      console.log("🟢 Connecté avec l'ID :", this.socket.id);
    });

    // fastfoodId est unique pour chaque fastfood
    this.socket.emit('join_fastfood', 'BQZK3Shkp7ECUGMpWI2w');

    this.socket.on('newOrder', (data: any) => {
      console.log('🍔 Nouvelle commande reçue :', data);
      this.ordersService.addOrderTabs(data.data);
    });

    this.socket.on('disconnect', () => {
      console.log('🔴 Déconnecté');
    });
  }
}
