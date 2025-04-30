import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PannierTobuyPageRoutingModule } from './pannier-tobuy-routing.module';

import { PannierTobuyPage } from './pannier-tobuy.page';
import { PannierStatutPageModule } from '../pannier-statut/pannier-statut.module';
import { PannierAchatPageModule } from '../pannier-achat/pannier-achat.module';
import { PannierCmdDetailPageModule } from '../pannier-cmd-detail/pannier-cmd-detail.module';
import { PannierCmdDetail2PageModule } from '../pannier-cmd-detail2/pannier-cmd-detail2.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PannierTobuyPageRoutingModule, PannierAchatPageModule, PannierCmdDetailPageModule, PannierCmdDetail2PageModule, SharedModule],
  declarations: [PannierTobuyPage],
  exports: [PannierTobuyPage],
})
export class PannierTobuyPageModule {}
