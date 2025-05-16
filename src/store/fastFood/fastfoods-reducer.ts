// src/app/store/fastFoods.reducer.ts

import { createAction, createReducer, on, props } from '@ngrx/store';

/* --- State initial --- */
const initialFastfoodState = { fastFoods: null as any[] | null };

/* --- Actions --- */
export const addFastFoods = createAction('[fastFoods] Add', props<{ fastFoods: any }>());
export const setFastFoods = createAction('[fastFoods] set ', props<{ fastFoodsTab: any[] | null }>());

/* --- Reducer --- */
export const fastFoodReducer = createReducer(
  initialFastfoodState,
  on(setFastFoods, (state, { fastFoodsTab }) => ({ fastFoods: fastFoodsTab })),
  on(addFastFoods, (state, { fastFoods }) => ({ fastFoods: state.fastFoods ? [fastFoods, ...state.fastFoods] : [fastFoods] }))
);
