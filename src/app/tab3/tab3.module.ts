import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { PorteFeuilHistoriquePageModule } from './historique/porte-feuil-historique/porte-feuil-historique.module';
import { SharedModule } from '../shared/shared.module';
import { HistoriquePageModule } from './historique/historique.module';
import { CommandePageModule } from './commande/commande.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    Tab3PageRoutingModule,
    PorteFeuilHistoriquePageModule,
    HistoriquePageModule,
    CommandePageModule,
    SharedModule,
  ],
  declarations: [Tab3Page],
})
export class Tab3PageModule {}
