import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../components/loader/loader.component';
import { NetworkErrorComponent } from '../components/network-error/network-error.component';
import { IonicModule } from '@ionic/angular';
import { PendingUserOrderComponent } from '../tab2/manage-passed-order-status/pending-user-order/pending-user-order.component';
import { CmdActionPage } from '../homeComponents/cmd-action/cmd-action.page';
import { ProcessingUserOrderComponent } from '../tab2/manage-passed-order-status/processing-user-order/processing-user-order.component';
import { FinishedUserOrderComponent } from '../tab2/manage-passed-order-status/finished-user-order/finished-user-order.component';
import { UserOrderItemComponent } from '../tab2/manage-passed-order-status/user-order-item/user-order-item.component';

import { FastFoodDesign1Component } from '../tab1/fastFood/fast-food-design1/fast-food-design1.component';
import { FastFoodDesign2Component } from '../tab1/fastFood/fast-food-design2/fast-food-design2.component';
import { FastFoodDesign3Component } from '../tab1/fastFood/fast-food-design3/fast-food-design3.component';
import { FastFoodDesign4Component } from '../tab1/fastFood/fast-food-design4/fast-food-design4.component';

import { Item2Component } from '../homeComponents/item2/item2.component';
import { Item3Component } from '../homeComponents/item3/item3.component';
import { HeaderComponent } from '../homeComponents/pannier-tobuy/header/header.component';
import { PendingCmdComponent } from '../tab3/commande/pending-cmd/pending-cmd.component';
import { ProccessCmdComponent } from '../tab3/commande/proccess-cmd/proccess-cmd.component';
import { FinishCmdComponent } from '../tab3/commande/finish-cmd/finish-cmd.component';
import { Component0Component } from '../statComponents/component0/component0.component';
import { Component3Component } from '../statComponents/component3/component3.component';
import { Component2Component } from '../statComponents/component2/component2.component';
import { Component1Component } from '../statComponents/component1/component1.component';
import { MarchandHeaderComponent } from '../homeComponents/marchand-header/marchand-header.component';

@NgModule({
  declarations: [
    PendingUserOrderComponent,
    ProcessingUserOrderComponent,
    FinishedUserOrderComponent,
    UserOrderItemComponent,

    HeaderComponent,
    MarchandHeaderComponent,

    Component0Component,
    Component1Component,
    Component2Component,
    Component3Component,

    Item2Component,
    Item3Component,
    PendingCmdComponent,
    ProccessCmdComponent,
    FinishCmdComponent,

    FastFoodDesign1Component,
    FastFoodDesign2Component,
    FastFoodDesign3Component,
    FastFoodDesign4Component,

    CmdActionPage,

    LoaderComponent,
    NetworkErrorComponent,
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    HeaderComponent,
    MarchandHeaderComponent,
    FastFoodDesign1Component,
    FastFoodDesign2Component,
    FastFoodDesign3Component,
    FastFoodDesign4Component,

    Component0Component,
    Component1Component,
    Component2Component,
    Component3Component,

    CmdActionPage,
    LoaderComponent,
    NetworkErrorComponent,

    PendingCmdComponent,
    ProccessCmdComponent,
    FinishCmdComponent,
  ],
})
export class SharedModule {}
