import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { BonusComponent } from '../tab2/bonus-order-buyed/bonus/bonus.component';
import { SharedModule } from './shared.module';
import { RouterModule } from '@angular/router';
import { ListMenuComponent } from '../tab3/page-list-menu-fast-food/list-menu/list-menu.component';
import { NewMenuComponent } from '../tab3/page-list-menu-fast-food/new-menu/new-menu.component';
import { MenuItemListComponent } from '../tab3/page-list-menu-fast-food/menu-item-list/menu-item-list.component';
import { PageDispoPageModule } from '../tab3/page-list-menu-fast-food/page-dispo/page-dispo.module';
import { PageModifyComponent } from '../tab3/page-list-menu-fast-food/page-modify/page-modify.component';
import { ConfirmMenuDialogComponent } from '../tab3/page-list-menu-fast-food/confirm-menu-dialog/confirm-menu-dialog.component';
import { ModalItem1Component } from '../tab3/page-list-menu-fast-food/confirm-menu-dialog/modal-item1/modal-item1.component';
import { OrderModalComponent } from '../tab3/commande/components/order-modal/order-modal.component';
import { OrderModalItem1Component } from '../tab3/commande/components/order-modal/order-modal-item1/order-modal-item1.component';
import { OrderModalItem2Component } from '../tab3/commande/components/order-modal/order-modal-item2/order-modal-item2.component';
import { OrderModalItem3Component } from '../tab3/commande/components/order-modal/order-modal-item3/order-modal-item3.component';
import { PendingCmdComponent } from '../tab3/commande/pending-cmd/pending-cmd.component';
import { CustumCkeckboxComponent } from '../components/custum-ckeckbox/custum-ckeckbox.component';

@NgModule({
  declarations: [
    BonusComponent,
    ListMenuComponent,
    NewMenuComponent,
    MenuItemListComponent,
    PageModifyComponent,
    ConfirmMenuDialogComponent,
    ModalItem1Component,
    OrderModalComponent,
    OrderModalItem1Component,
    OrderModalItem2Component,
    OrderModalItem3Component,

    CustumCkeckboxComponent,
    PendingCmdComponent,
  ],
  imports: [CommonModule, IonicModule, FormsModule, SharedModule, RouterModule],
  exports: [
    CustumCkeckboxComponent,
    BonusComponent,
    MenuItemListComponent,
    PageModifyComponent,
    ConfirmMenuDialogComponent,
    ModalItem1Component,
    OrderModalComponent,
    OrderModalItem1Component,
    OrderModalItem2Component,
    OrderModalItem3Component,
    SharedModule,

    PendingCmdComponent,
  ],
})
export class SharedModule2 {}
