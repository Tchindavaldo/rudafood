// src/app/store/order.reducer.ts

import { createAction, createReducer, on, props } from '@ngrx/store';

/* --- State initial --- */
const initialOrderState = { orders: null as any[] | null };

/* --- Actions --- */
export const addUserOrderReducer = createAction('[user-order] Add', props<{ order: any }>());
export const setUserOrderReducer = createAction('[user-order] set Order', props<{ orderTab: any[] | null }>());
export const updateUserOrderReducer = createAction('[user-order] Update Order', props<{ updatedOrder: any }>());

/* --- Reducer --- */
export const userOrderReducer = createReducer(
  initialOrderState,
  on(setUserOrderReducer, (state, { orderTab }) => ({ orders: orderTab })),

  // Ajout d'une commande avec vérification pour éviter les doublons
  on(addUserOrderReducer, (state, { order }) => {
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
  on(updateUserOrderReducer, (state, { updatedOrder }) => {
    if (!state.orders) return state;

    // Créer un nouveau tableau avec la commande mise à jour
    const updatedOrders = state.orders.map(order => (order.id === updatedOrder.id ? { ...order, ...updatedOrder } : order));

    console.log(updatedOrders.find(order => order.id === updatedOrder.id).quantity);

    return { orders: updatedOrders };
  })
);
