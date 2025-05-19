// src/app/store/order.reducer.ts

import { createAction, createReducer, on, props } from '@ngrx/store';

/* --- State initial --- */
const initialOrderState = { orders: null as any[] | null };

/* --- Actions --- */
export const addFastFoodOrder = createAction('[fastfood-order] Add', props<{ order: any }>());
export const setFastFoodOrder = createAction('[fastfood-order] set Order', props<{ orderTab: any[] | null }>());
export const updateFastFoodOrder = createAction('[fastfood-order] Update Order', props<{ updatedOrder: any }>());

/* --- Reducer --- */
export const orderReducer = createReducer(
  initialOrderState,
  on(setFastFoodOrder, (state, { orderTab }) => ({ orders: orderTab })),

  // Ajout d'une commande avec vérification pour éviter les doublons
  on(addFastFoodOrder, (state, { order }) => {
    // Si orders est null, on ne fait rien
    if (!state.orders) return state;

    // Vérifier si la commande existe déjà
    const orderExists = state.orders.some(existingOrder => existingOrder.id === order.id);

    // Si la commande existe déjà, on ne l'ajoute pas
    if (orderExists) return state;

    // Sinon, on l'ajoute au début du tableau
    return { orders: [order, ...state.orders] };
  }),

  // Mise à jour d'une commande existante
  on(updateFastFoodOrder, (state, { updatedOrder }) => {
    if (!state.orders) return state;

    // Créer un nouveau tableau avec la commande mise à jour
    const updatedOrders = state.orders.map(order => (order.id === updatedOrder.id ? { ...order, ...updatedOrder } : order));

    return { orders: updatedOrders };
  })
);
