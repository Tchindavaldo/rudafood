import axios from 'axios';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ToastService } from 'src/services/toast/toast.service';
import { updateMenu } from 'src/store/menu/menu-reducer';
import { updateMenuInFastFood } from 'src/store/fastFood/fastfoods-reducer';
import { AppState } from 'src/store/indx';

@Injectable({ providedIn: 'root' })
export class UpdateMenuService {
  private apiUrl = environment.apiUrl;
  constructor(private toast: ToastService, private store: Store<AppState>) {}

  async updateMenu(id: string, menu: any): Promise<any> {
    try {
      const response = await axios.put(`${this.apiUrl}/menu/${id}`, menu, {
        headers: { 'ngrok-skip-browser-warning': 'true' },
      });

      const updatedMenu = response.data.data;

      // Update the menu in the menu store
      this.store.dispatch(updateMenu({ menu: updatedMenu }));

      // Update the menu in the fastFood store if fastFoodId is present
      if (updatedMenu.fastFoodId) {
        this.store.dispatch(
          updateMenuInFastFood({
            fastFoodId: updatedMenu.fastFoodId,
            menu: updatedMenu,
          })
        );
      }
      const dataReturn = { data: response.data.data, message: response.data.message, success: response.data.success };

      this.toast.presentToast('top', response.data.message || 'Menu mis à jour');
      return dataReturn;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du menu:', error);
      const dataReturn = { data: error, success: false };
      this.toast.presentToast('top', 'Erreur lors de la mise à jour du menu');
      return dataReturn;
    }
  }
}
