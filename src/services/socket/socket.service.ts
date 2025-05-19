import { io, Socket } from 'socket.io-client';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { initSessionSocketService } from './init-session-socket.service ';
import { MenuSocketService } from './menu/menu-socket.service';
import { FastfoodSocketService } from './fastFood/fastFood-socket.service';
import { NotificationSocketService } from './notification/notification-socket.service';
import { GetTransactionSocketService } from './transaction/get-transaction-socket.service';
import { UserOrderSocketService } from './order/user-order-socket.service';
import { FastFoodOrderSocketService } from './order/fastFood-order-socket.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;
  private apiUrl = environment.apiUrl;

  constructor(
    private menuSocketService: MenuSocketService,
    private fastfoodSocketService: FastfoodSocketService,
    private sessionSocketServie: initSessionSocketService,
    private userOrderSocketService: UserOrderSocketService,
    private notificationSocketServie: NotificationSocketService,
    private fastFoodOrderSocketService: FastFoodOrderSocketService,
    private getTransactionSocketService: GetTransactionSocketService
  ) {
    this.socket = io(this.apiUrl);
  }

  public initializeAllSockets() {
    this.sessionSocketServie.initializeSocket(this.socket);

    this.menuSocketService.initializeSocket(this.socket);
    this.notificationSocketServie.initializeSocket(this.socket);
    this.fastfoodSocketService.initializeSocket(this.socket);
    this.userOrderSocketService.initializeOrderSocket(this.socket);
    this.fastFoodOrderSocketService.initializeOrderSocket(this.socket);
    this.getTransactionSocketService.initializeTransactionSocket(this.socket);
  }

  getSocket = () => this.socket;
}
