import { createAction, createReducer, on, props } from '@ngrx/store';

/* --- State initial --- */
export interface MenuState {
  menuTab: any[] | null;
}

export const initialMenuState: MenuState = {
  menuTab: null,
};

/* --- Actions --- */
export const addMenu = createAction('[Menu] Add', props<{ menu: any }>());
export const updateMenu = createAction('[Menu] Update', props<{ menu: any }>());
export const initMenu = createAction('[Menu] Init', props<{ menuTab: any[] }>());
export const deleteMenu = createAction('[Menu] Delete', props<{ menuId: string | number }>());

/* --- Reducer --- */
export const MenuReducer = createReducer(
  initialMenuState,
  on(initMenu, (state, { menuTab }) => ({ menuTab: menuTab })),
  on(addMenu, (state, { menu }) => {
    // Ne fait l'ajout que si menuTab n'est pas null
    if (state.menuTab === null) return state;
    
    // Vérifier si le menu existe déjà
    const menuExists = state.menuTab.some(m => m.id === menu.id);
    if (menuExists) return state;
    
    // Ajouter le menu au début du tableau
    return { menuTab: [menu, ...state.menuTab] };
  }),
  on(deleteMenu, (state, { menuId }) => ({ menuTab: state.menuTab ? state.menuTab.filter(m => m.id !== menuId) : null })),
  on(updateMenu, (state, { menu }) => ({ menuTab: state.menuTab ? state.menuTab.map(m => (m.id === menu.id ? { ...m, ...menu } : m)) : null }))
);
