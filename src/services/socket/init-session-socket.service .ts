import { Injectable, Injector } from '@angular/core';
import { Socket } from 'socket.io-client';
import { UserDataService } from '../user/data/userData.service';
import { UserStorageService } from '../storgae/user-storage';

@Injectable({
  providedIn: 'root',
})
export class initSessionSocketService {
  user!: any;
  constructor(private userStorage: UserStorageService) {}

  public async initializeSocket(socket: Socket) {
    // socket = io(this.apiUrl);
    const user = await this.userStorage.get('user');

    socket.on('connect', () => {
      console.log("🟢 Connecté avec l'ID :", socket.id);
    });

    socket.emit('join_user', user.uid);

    socket.on('disconnect', () => {
      console.log('🔴 Déconnecté');
    });
  }
}
