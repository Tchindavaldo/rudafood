import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoriquePageRoutingModule } from './historique-routing.module';

import { HistoriquePage } from './historique.page';
import { PorteFeuilHistoriquePageModule } from 'src/app/tab3/historique/porte-feuil-historique/porte-feuil-historique.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HistoriquePageRoutingModule, PorteFeuilHistoriquePageModule, SharedModule],
  declarations: [HistoriquePage],
})
export class HistoriquePageModule {}
