import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CmdActionPageRoutingModule } from './cmd-action-routing.module';

import { CmdActionPage } from './cmd-action.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [SharedModule, CommonModule, FormsModule, IonicModule, CmdActionPageRoutingModule],
  declarations: [],
  exports: [],
})
export class CmdActionPageModule {}
