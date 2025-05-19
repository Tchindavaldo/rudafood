import axios from 'axios';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ToastService } from 'src/services/toast/toast.service';
import { deleteMenu } from 'src/store/menu/menu-reducer';
import { deleteMenuFromFastFood } from 'src/store/fastFood/fastfoods-reducer';
import { AppState } from 'src/store/indx';

@Injectable({ providedIn: 'root' })
export class DeleteMenuService {
  private apiUrl = environment.apiUrl;
  constructor(private toast: ToastService, private store: Store<AppState>) {}

  async DeleteMenu(menuId: string): Promise<any> {
    try {
      const response = await axios.delete(`${this.apiUrl}/menu/${menuId} `, { headers: { 'ngrok-skip-browser-warning': 'true' } });
      // this.store.dispatch(initMenu({ menuTab: response.data.data }));
      const dataReturn = { data: response.data.data, message: response.data.message, success: response.data.success };
      this.toast.presentToast('top', response.data.message || 'Menu supprimé avec succès');
      this.store.dispatch(deleteMenuFromFastFood({ fastFoodId: response.data.data.id, menuId }));
      this.store.dispatch(deleteMenu({ menuId }));
      return dataReturn;
    } catch (error) {
      console.error('Erreur lors de la suppression du menu:', error);
      const dataReturn = { data: error, success: false };
      this.toast.presentToast('top', 'Erreur lors de la suppression du menu');
      return dataReturn;
    }
  }
}
