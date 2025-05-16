// src/app/store/reducers/index.ts

import { ActionReducerMap } from '@ngrx/store';
import { fastFoodReducer } from './fastFood/fastfoods-reducer';
import { orderReducer } from './order/order-fastfood-reducer';
import { userOrderReducer } from './order/order-user-reducer';
import { NotificationReducer } from './notification/notification-reducer';
import { bonusReducer } from './bonus/bonus-reducer';

export interface AppState {
  fastFoods: any;
  bonus: any;

  userOrder: any;
  fastFoodOrder: any;
  userNotification: any;
}

export const reducers: ActionReducerMap<AppState> = {
  bonus: bonusReducer,
  fastFoods: fastFoodReducer,
  userOrder: userOrderReducer,
  fastFoodOrder: orderReducer,
  userNotification: NotificationReducer,
};
