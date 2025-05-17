import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { PorteFeuilHistoriquePageModule } from './historique/porte-feuil-historique/porte-feuil-historique.module';
import { SharedModule } from '../shared/shared.module';
import { HistoriquePageModule } from './historique/historique.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ExploreContainerComponentModule, Tab3PageRoutingModule, PorteFeuilHistoriquePageModule, HistoriquePageModule],
  declarations: [Tab3Page],
})
export class Tab3PageModule {}
