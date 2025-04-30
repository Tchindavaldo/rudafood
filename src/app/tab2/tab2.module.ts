import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { PannierBonnusPageModule } from '../homeComponents/pannier-bonnus/pannier-bonnus.module';
import { PannierAchatOrPageModule } from '../homeComponents/pannier-achat-or/pannier-achat-or.module';
import { CmdBottomCardPageModule } from '../componentTab2/cmd-bottom-card/cmd-bottom-card.module';
import { CmdStatutPageModule } from './cmd-statut/cmd-statut.module';
import { PendingOrderToBuyComponent } from './pending-order-to-buy/pending-order-to-buy.component';
import { StatusOrderBuyedComponent } from './status-order-buyed/status-order-buyed.component';
import { BonusOrderBuyedComponent } from './bonus-order-buyed/bonus-order-buyed.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    PannierAchatOrPageModule,
    PannierBonnusPageModule,
    CmdBottomCardPageModule,
    CmdStatutPageModule,
  ],
  declarations: [Tab2Page, PendingOrderToBuyComponent, StatusOrderBuyedComponent, BonusOrderBuyedComponent],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab2PageModule {}
