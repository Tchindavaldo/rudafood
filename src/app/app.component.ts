import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SocketService } from '../services/socket/socket.service';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  ngOnInit(): void {}

  initializeApp() {
    this.platform.ready().then(() => {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark');
    });
  }
}
