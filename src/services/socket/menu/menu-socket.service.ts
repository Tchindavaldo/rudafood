import { Injectable, Injector } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { OrderDataService } from '../../orders/data/order-data.service';
import { environment } from 'src/environments/environment.prod';
import { Store } from '@ngrx/store';
import { addFastFoodOrder, setFastFoodOrder } from 'src/store/order/order-fastfood-reducer';
import { setObjectOnTabByArg } from '../../../utils/setObjectOnTabByArg';
import { Observable } from 'rxjs';
import { AppState } from 'src/store/indx';
import { setUserOrderReducer } from 'src/store/order/order-user-reducer';
import { initSessionSocketService } from '../init-session-socket.service ';
import { fastFoodsDataService } from '../../FastFood/data/fastFood-data.service';
import { addFastFoods, setFastFoods } from 'src/store/fastFood/fastfoods-reducer';
import { addMenu } from 'src/store/menu/menu-reducer';
import { UserStorageService } from 'src/services/storgae/user-storage';

@Injectable({
  providedIn: 'root',
})
export class MenuSocketService {
  constructor(private fastFoodData: fastFoodsDataService, private store: Store<AppState>, private userStorageService: UserStorageService) {}

  public initializeSocket(socket: Socket) {
    socket.on('newMenu', async (data: any) => {
      let designIndex = 0;
      if (this.fastFoodData.getFastfoods() !== null) {
        console.log('🍔 Nouveau menu reçue :', data);
        designIndex = this.fastFoodData.getFastfoods().length % 4;
        const fastFood = { ...data.fastFood, designIndex };
        const localUpdateFastFoods = setObjectOnTabByArg(this.fastFoodData.getFastfoods(), fastFood, 'id', data.fastFood.id, true);
        this.store.dispatch(setFastFoods({ fastFoodsTab: localUpdateFastFoods }));
      }

      const { fastFoodId } = await this.userStorageService.get('user');
      console.log('fastFoodId', fastFoodId);
      console.log('fastFoodId', data.menu.fastFoodId);
      if (data.menu.fastFoodId === fastFoodId) {
        console.log('🍔 Menu ajouté au store');
        this.store.dispatch(addMenu({ menu: data.menu }));
      }
    });
  }
}
