import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageListCmdFastFoodPageRoutingModule } from './page-list-cmd-fast-food-routing.module';

import { PageListCmdFastFoodPage } from './page-list-cmd-fast-food.page';
import { Component2PageModule } from 'src/app/statComponents/component2/component2.module';
import { Component1PageModule } from 'src/app/statComponents/component1/component1.module';
import { Component0PageModule } from 'src/app/statComponents/component0/component0.module';
import { Component3PageModule } from 'src/app/statComponents/component3/component3.module';
import { CmdActionPageModule } from '../cmd-action/cmd-action.module';
import { FormPageModule } from 'src/app/tab3/form/form.module';
import { PendingCmdComponent } from './pending-cmd/pending-cmd.component';
import { ProccessCmdComponent } from './proccess-cmd/proccess-cmd.component';
import { FinishCmdComponent } from './finish-cmd/finish-cmd.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageListCmdFastFoodPageRoutingModule,
    Component2PageModule,
    Component1PageModule,
    Component0PageModule,
    Component3PageModule,
    CmdActionPageModule,
    FormPageModule,

  ],
  declarations: [PageListCmdFastFoodPage,
    PendingCmdComponent,
    ProccessCmdComponent,
    FinishCmdComponent],
  exports: [PageListCmdFastFoodPage]
})
export class PageListCmdFastFoodPageModule { }
