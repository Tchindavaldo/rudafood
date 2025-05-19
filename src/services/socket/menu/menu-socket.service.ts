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
import { addFastFoods, addMenuToFastFood, deleteMenuFromFastFood, setFastFoods, updateMenuInFastFood } from 'src/store/fastFood/fastfoods-reducer';
import { addMenu, deleteMenu, updateMenu } from 'src/store/menu/menu-reducer';
import { UserStorageService } from 'src/services/storgae/user-storage';

@Injectable({
  providedIn: 'root',
})
export class MenuSocketService {
  constructor(private fastFoodData: fastFoodsDataService, private store: Store<AppState>, private userStorageService: UserStorageService) {}

  public async initializeSocket(socket: Socket) {
    const { fastFoodId } = await this.userStorageService.get('user');

    // Gestion d'un nouveau menu global
    socket.on('newGlobalMenu', async (data: any) => {
      console.log('🍔 Nouveau menu global reçu :', data);
      this.store.dispatch(addMenuToFastFood({ fastFoodId: data.menu.fastFoodId, menu: data.menu }));
    });

    // Gestion d'un nouveau menu pour un fastfood spécifique
    socket.on('newFastFoodMenu', async (data: any) => {
      console.log('🍔 Nouveau menu fastfood reçu :', data);
      this.store.dispatch(addMenu({ menu: data.menu }));
    });

    socket.on('fastFoodMenuDeleted', (data: any) => {
      console.log('🍔 Menu supprimé fastfood  :', data);
      this.store.dispatch(deleteMenu({ menuId: data.menuId }));
    });

    socket.on('globalMenuDeleted', (data: any) => {
      console.log('🍔 Menu supprimé global :', data);
      this.store.dispatch(deleteMenuFromFastFood({ fastFoodId: data.fastFood.id, menuId: data.menuId }));
    });

    socket.on('globalMenuUpdated', (data: any) => {
      console.log('🍔 Menu mis à jour global :', data);
      if (data.menu && data.menu.fastFoodId) this.store.dispatch(updateMenuInFastFood({ fastFoodId: data.menu.fastFoodId, menu: data.menu }));
    });

    socket.on('fastFoodMenuUpdated', (data: any) => {
      console.log('🍔 Menu mis à jour fastfood :', data);
      if (data.menu) this.store.dispatch(updateMenu({ menu: data.menu }));
    });
  }
}
