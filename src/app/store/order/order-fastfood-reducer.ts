// src/app/store/order.reducer.ts

import { createAction, createReducer, on, props } from '@ngrx/store';

/* --- State initial --- */
const initialOrderState = { orders: null as any[] | null };

/* --- Actions --- */
export const addFastFoodOrder = createAction('[fastfood-order] Add', props<{ order: any }>());
export const setFastFoodOrder = createAction('[fastfood-order] set Order', props<{ orderTab: any[] | null }>());

/* --- Reducer --- */
export const orderReducer = createReducer(
  initialOrderState,
  on(setFastFoodOrder, (state, { orderTab }) => ({ orders: orderTab })),
  on(addFastFoodOrder, (state, { order }) => ({ orders: state.orders ? [order, ...state.orders] : [order] }))
);
