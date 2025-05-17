import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PorteFeuilHistoriquePageRoutingModule } from './porte-feuil-historique-routing.module';

import { PorteFeuilHistoriquePage } from './porte-feuil-historique.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PorteFeuilHistoriquePageRoutingModule
  ],
  declarations: [PorteFeuilHistoriquePage],
  exports:[PorteFeuilHistoriquePage]
})
export class PorteFeuilHistoriquePageModule {}
