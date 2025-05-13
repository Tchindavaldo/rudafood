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

@Injectable({
  providedIn: 'root',
})
export class MenuSocketService {
  constructor(private fastFoodData: fastFoodsDataService, private store: Store<AppState>) {}

  public initializeSocket(socket: Socket) {
    socket.on('newMenu', (data: any) => {
      console.log('🍔 Nouveau menu reçue :', data);

      const designIndex = this.fastFoodData.getFastfoods().length % 4;
      const fastFood = { ...data.fastFood, designIndex };

      const localUpdateFastFoods = setObjectOnTabByArg(this.fastFoodData.getFastfoods(), fastFood, 'id', data.fastFood.id, true);
      this.store.dispatch(setFastFoods({ fastFoodsTab: localUpdateFastFoods }));
    });
  }
}
