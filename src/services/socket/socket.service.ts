import { io, Socket } from 'socket.io-client';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { OrderSocketService } from './order/order-socket.service';
import { initSessionSocketService } from './init-session-socket.service ';
import { MenuSocketService } from './menu/menu-socket.service';
import { FastfoodSocketService } from './fastFood/fastFood-socket.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;
  private apiUrl = environment.apiUrl;

  constructor(
    private menuSocketService: MenuSocketService,
    private orderSocketService: OrderSocketService,
    private fastfoodSocketService: FastfoodSocketService,
    private sessionSocketServie: initSessionSocketService
  ) {
    this.socket = io(this.apiUrl);
  }

  public initializeAllSockets() {
    this.sessionSocketServie.initializeSocket(this.socket);

    this.menuSocketService.initializeSocket(this.socket);
    this.fastfoodSocketService.initializeSocket(this.socket);
    this.orderSocketService.initializeOrderSocket(this.socket);
  }
}
