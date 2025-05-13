import { Injectable, Injector } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { OrderDataService } from '../../orders/data/order-data.service';
import { environment } from 'src/environments/environment.prod';
import { Store } from '@ngrx/store';
import { addFastFoodOrder, setFastFoodOrder } from 'src/app/store/order/order-fastfood-reducer';
import { setObjectOnTabByArg } from '../../../app/utils/setObjectOnTabByArg';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/indx';
import { setUserOrderReducer } from 'src/app/store/order/order-user-reducer';
import { initSessionSocketService } from '../init-session-socket.service ';
import { fastFoodsDataService } from '../../FastFood/data/fastFood-data.service';
import { addFastFoods, setFastFoods } from 'src/app/store/fastFood/fastfoods-reducer';
import { UserStorageService } from '../../storgae/user-storage';

@Injectable({
  providedIn: 'root',
})
export class FastfoodSocketService {
  constructor(private fastFoodData: fastFoodsDataService, private store: Store<AppState>, private userStorage: UserStorageService) {}

  public initializeSocket(socket: Socket) {
    socket.on('newFastfood', async (data: any) => {
      console.log('🍔 Nouvelle fastfood reçue :', data);

      const designIndex = this.fastFoodData.getFastfoods().length % 4;
      this.store.dispatch(addFastFoods({ fastFoods: { ...data.fastFood, designIndex } }));

      const user = await this.userStorage.get('user');
      await this.userStorage.set('user', { ...user, fastFoodId: data.fastFood.id });
    });

    socket.on('updateFastFoods', (data: any) => {
      console.log('🍔 Nouvelle fastfood modifier :', data);
      const localUpdateFastFoods = setObjectOnTabByArg(this.fastFoodData.getFastfoods(), data.fastFood, 'id', data.fastFood.id);
      this.store.dispatch(setFastFoods({ fastFoodsTab: localUpdateFastFoods }));
    });
  }
}
