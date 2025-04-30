// src/app/store/order.reducer.ts

import { createAction, createReducer, on, props } from '@ngrx/store';

/* --- State initial --- */
const initialOrderState = { orders: null as any[] | null };

/* --- Actions --- */
export const addUserOrderReducer = createAction('[user-order] Add', props<{ order: any }>());
export const setUserOrderReducer = createAction('[user-order] set Order', props<{ orderTab: any[] | null }>());

/* --- Reducer --- */
export const userOrderReducer = createReducer(
  initialOrderState,
  on(setUserOrderReducer, (state, { orderTab }) => ({ orders: orderTab })),
  on(addUserOrderReducer, (state, { order }) => ({ orders: state.orders ? [order, ...state.orders] : [order] }))
);
