import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PannierAchatOrPageRoutingModule } from './pannier-achat-or-routing.module';

import { PannierAchatOrPage } from './pannier-achat-or.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PannierAchatOrPageRoutingModule
  ],
  declarations: [PannierAchatOrPage],
  exports:[PannierAchatOrPage]
})
export class PannierAchatOrPageModule {}
