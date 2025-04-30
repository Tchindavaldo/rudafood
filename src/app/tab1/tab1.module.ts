import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';

import { PannierTobuyPageModule } from '../homeComponents/pannier-tobuy/pannier-tobuy.module';
import { PannierAchatPageModule } from '../homeComponents/pannier-achat/pannier-achat.module';
import { SharedModule } from '../shared/shared.module';
import { FastFoodDesign1Component } from './fastFood/fast-food-design1/fast-food-design1.component';
import { FastFoodDesign2Component } from './fastFood/fast-food-design2/fast-food-design2.component';
import { FastFoodDesign3Component } from './fastFood/fast-food-design3/fast-food-design3.component';
import { FastFoodDesign4Component } from './fastFood/fast-food-design4/fast-food-design4.component';

@NgModule({
  imports: [IonicModule, CommonModule, ExploreContainerComponentModule, Tab1PageRoutingModule, SharedModule, PannierAchatPageModule, PannierTobuyPageModule],
  declarations: [Tab1Page],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab1PageModule {}
