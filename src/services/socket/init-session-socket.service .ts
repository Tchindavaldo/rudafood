import { Injectable, Injector } from '@angular/core';
import { Socket } from 'socket.io-client';
import { UserDataService } from '../user/data/userData.service';
import { UserStorageService } from '../storgae/user-storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class initSessionSocketService {
  user!: any;
  constructor(private userStorage: UserStorageService) {}
  public socketReady = new BehaviorSubject<boolean>(false);

  public async initializeSocket(socket: Socket) {
    // socket = io(this.apiUrl);
    const user = await this.userStorage.get('user');

    socket.on('connect', async () => {
      console.log("🟢 Connecté avec l'ID :", socket.id);

      const user = await this.userStorage.get('user');
      if (user?.uid) {
        socket.emit('join_user', user.uid); // ✅ garantir que c'est bien envoyé à chaque reconnexion
        console.log(`📨 Rejoint la room user: ${user.uid}`);
        this.socketReady.next(true); // 🔥 signal prêt
      }
    });

    socket.on('disconnect', () => {
      console.log('🔴 Déconnecté');
    });
  }
}
