import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PannierCmdDetailPageRoutingModule } from './pannier-cmd-detail-routing.module';

import { PannierCmdDetailPage } from './pannier-cmd-detail.page';
import { SharedModule2 } from 'src/app/shared/shared2.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PannierCmdDetailPageRoutingModule, SharedModule2],
  declarations: [PannierCmdDetailPage],
  exports: [PannierCmdDetailPage],
})
export class PannierCmdDetailPageModule {}
