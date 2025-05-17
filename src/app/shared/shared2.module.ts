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

@NgModule({
  declarations: [BonusComponent, ListMenuComponent, NewMenuComponent, MenuItemListComponent, PageModifyComponent, ConfirmMenuDialogComponent, ModalItem1Component],
  imports: [CommonModule, IonicModule, FormsModule, SharedModule, RouterModule],
  exports: [BonusComponent, MenuItemListComponent, PageModifyComponent, ConfirmMenuDialogComponent, ModalItem1Component],
})
export class SharedModule2 {}
