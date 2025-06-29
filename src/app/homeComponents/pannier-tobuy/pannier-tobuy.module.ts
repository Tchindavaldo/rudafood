import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PannierTobuyPageRoutingModule } from './pannier-tobuy-routing.module';

import { PannierTobuyPage } from './pannier-tobuy.page';
import { PannierStatutPageModule } from '../pannier-statut/pannier-statut.module';
import { PannierAchatPageModule } from '../pannier-achat/pannier-achat.module';
import { PannierCmdDetailPageModule } from '../pannier-cmd-detail/pannier-cmd-detail.module';
import { SharedModule } from '../../shared/shared.module';
import { SharedModule2 } from 'src/app/shared/shared2.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PannierTobuyPageRoutingModule, PannierAchatPageModule, PannierCmdDetailPageModule, SharedModule2],
  declarations: [PannierTobuyPage],
  exports: [PannierTobuyPage],
})
export class PannierTobuyPageModule {}
