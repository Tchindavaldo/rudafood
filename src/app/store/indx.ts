// src/app/store/reducers/index.ts

import { ActionReducerMap } from '@ngrx/store';
import { fastFoodReducer } from './fastFood/fastfoods-reducer';
import { orderReducer } from './order/order-fastfood-reducer';
import { userOrderReducer } from './order/order-user-reducer';

export interface AppState {
  fastFoods: any;

  userOrder: any;
  fastFoodOrder: any;
}

export const reducers: ActionReducerMap<AppState> = {
  fastFoods: fastFoodReducer,
  userOrder: userOrderReducer,
  fastFoodOrder: orderReducer,
};
