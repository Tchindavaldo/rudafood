// src/app/store/fastFoods.reducer.ts

import { createAction, createReducer, on, props } from '@ngrx/store';

/* --- State initial --- */
const initialFastfoodState = { fastFoods: null as any[] | null };

/* --- Actions --- */
export const addFastFoods = createAction('[fastFoods] Add', props<{ fastFoods: any }>());
export const setFastFoods = createAction('[fastFoods] set ', props<{ fastFoodsTab: any[] | null }>());
export const deleteMenuFromFastFood = createAction('[fastFoods] Delete Menu', props<{ fastFoodId: string; menuId: string }>());
export const updateMenuInFastFood = createAction('[fastFoods] Update Menu', props<{ fastFoodId: string; menu: any }>());
export const addMenuToFastFood = createAction('[fastFoods] Add Menu', props<{ fastFoodId: string; menu: any }>());

/* --- Reducer --- */
export const fastFoodReducer = createReducer(
  initialFastfoodState,
  on(setFastFoods, (state, { fastFoodsTab }) => ({ fastFoods: fastFoodsTab })),
  on(addFastFoods, (state, { fastFoods }) => ({ fastFoods: state.fastFoods ? [fastFoods, ...state.fastFoods] : [fastFoods] })),
  on(deleteMenuFromFastFood, (state, { fastFoodId, menuId }) => {
    if (!state.fastFoods) return state;
    const updatedFastFoods = state.fastFoods.map(fastFood => {
      if (fastFood.id !== fastFoodId) return fastFood;
      return { ...fastFood, menus: fastFood.menus ? fastFood.menus.filter((menu: any) => menu.id !== menuId) : [] };
    });

    return { fastFoods: updatedFastFoods };
  }),
  on(updateMenuInFastFood, (state, { fastFoodId, menu }) => {
    if (!state.fastFoods) return state;
    const updatedFastFoods = state.fastFoods.map(fastFood => {
      if (fastFood.id !== fastFoodId) return fastFood;
      
      // Si le fastfood n'a pas de menus, on retourne le fastfood inchangé
      if (!fastFood.menus) return fastFood;
      
      // On met à jour le menu dans la liste des menus du fastfood
      const updatedMenus = fastFood.menus.map((m: any) => 
        m.id === menu.id ? { ...m, ...menu } : m
      );
      
      return { ...fastFood, menus: updatedMenus };
    });

    return { fastFoods: updatedFastFoods };
  }),
  on(addMenuToFastFood, (state, { fastFoodId, menu }) => {
    if (!state.fastFoods) return state;
    
    const updatedFastFoods = state.fastFoods.map(fastFood => {
      // Si ce n'est pas le fastfood cible, on le retourne inchangé
      if (fastFood.id !== fastFoodId) return fastFood;
      
      // Initialiser le tableau de menus s'il n'existe pas
      const currentMenus = fastFood.menus || [];
      
      // Vérifier si le menu existe déjà pour éviter les doublons
      const menuExists = currentMenus.some((m: any) => m.id === menu.id);
      if (menuExists) return fastFood;
      
      // Ajouter le nouveau menu au début du tableau
      return { ...fastFood, menus: [menu, ...currentMenus] };
    });
    
    return { fastFoods: updatedFastFoods };
  })
);
