import { Injectable, Injector } from '@angular/core';
import { Socket } from 'socket.io-client';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/indx';
import { addTransactionReducer } from 'src/store/transaction/transaction-reducer';

@Injectable({
  providedIn: 'root',
})
export class GetTransactionSocketService {
  constructor(private store: Store<AppState>) {}

  public initializeTransactionSocket(socket: Socket) {
    socket.on('newTransaction', (data: any) => {
      console.log('💰 Nouvelle transaction reçue :', data);
      this.store.dispatch(addTransactionReducer({ Transaction: data.data }));
    });
  }
}
