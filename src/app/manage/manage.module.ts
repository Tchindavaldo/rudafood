import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagePageRoutingModule } from './manage-routing.module';

import { ManagePage } from './manage.page';
import { Component2PageModule } from '../statComponents/component2/component2.module';
import { Component1PageModule } from '../statComponents/component1/component1.module';
import { Component0PageModule } from '../statComponents/component0/component0.module';
import { Component3PageModule } from '../statComponents/component3/component3.module';
import { CmdActionPageModule } from './cmd-action/cmd-action.module';
import { FormPageModule } from '../tab3/form/form.module';
import { PageListCmdFastFoodPageModule } from './page-list-cmd-fast-food/page-list-cmd-fast-food.module';
import { PageListMenuFastFoodPageModule } from './page-list-menu-fast-food/page-list-menu-fast-food.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagePageRoutingModule,
    PageListCmdFastFoodPageModule,
    PageListMenuFastFoodPageModule,
  ],
  declarations: [ManagePage],
  exports: [ManagePage],
})
export class ManagePageModule {}
