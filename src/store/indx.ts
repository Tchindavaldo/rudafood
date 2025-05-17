// src/app/store/reducers/index.ts

import { ActionReducerMap } from '@ngrx/store';
import { bonusReducer } from './bonus/bonus-reducer';

import { MenuReducer } from './menu/menu-reducer';
import { fastFoodReducer } from './fastFood/fastfoods-reducer';
import { orderReducer } from './order/order-fastfood-reducer';
import { userOrderReducer } from './order/order-user-reducer';
import { TransactionReducer } from './transaction/transaction-reducer';
import { NotificationReducer } from './notification/notification-reducer';

export interface AppState {
  fastFoods: any;
  bonus: any;
  menu: any;

  userOrder: any;
  transaction: any;
  fastFoodOrder: any;
  userNotification: any;
}

export const reducers: ActionReducerMap<AppState> = {
  bonus: bonusReducer,
  fastFoods: fastFoodReducer,
  menu: MenuReducer,
  userOrder: userOrderReducer,
  fastFoodOrder: orderReducer,
  transaction: TransactionReducer,
  userNotification: NotificationReducer,
};
