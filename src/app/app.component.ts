import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SocketService } from './services/socket/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark');
    });
  }
}
