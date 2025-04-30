import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageListMenuFastFoodPageRoutingModule } from './page-list-menu-fast-food-routing.module';

import { PageListMenuFastFoodPage } from './page-list-menu-fast-food.page';
import { FormPageModule } from 'src/app/tab3/form/form.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PageListMenuFastFoodPageRoutingModule, SharedModule, FormPageModule],
  declarations: [PageListMenuFastFoodPage],
  exports: [PageListMenuFastFoodPage],
})
export class PageListMenuFastFoodPageModule {}
