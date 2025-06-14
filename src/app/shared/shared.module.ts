import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../components/loader/loader.component';
import { PendingUserOrderComponent } from '../tab2/manage-passed-order-status/pending-user-order/pending-user-order.component';
import { ProcessingUserOrderComponent } from '../tab2/manage-passed-order-status/processing-user-order/processing-user-order.component';
import { FinishedUserOrderComponent } from '../tab2/manage-passed-order-status/finished-user-order/finished-user-order.component';
import { DeliveredOrderComponent } from '../tab2/manage-passed-order-status/delivered-order/delivered-order.component';
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
import { MenuDesign2Component } from '../tab1/fastFood/fast-food-design2/menu-design2/menu-design2.component';
import { NoDataComponent } from '../components/no-data/no-data.component';
import { NoFastFoodComponent } from '../components/no-fast-food/no-fast-food.component';
import { CardNewFastFoodComponent } from '../components/no-fast-food/card-new-fast-food/card-new-fast-food.component2';
import { FormsModule } from '@angular/forms';
import { PendingOrderToBuyComponent } from '../tab2/pending-order-to-buy/pending-order-to-buy.component';
import { RouterModule } from '@angular/router';
import { TextActionComponent } from '../components/text-action/text-action.component';
import { FastFoodOrderComponent } from '../tab3/commande/components/fast-food-order/fast-food-order.component';
import { ExpandableTextComponent } from './components/expandable-text/expandable-text.component';
import { ConfirmProcesingOrderItem1Component } from '../tab3/commande/pending-cmd/confirm-procesing-order/confirm-procesing-order-item1/confirm-procesing-order-item1.component';
import { ConfirmProcesingOrderComponent } from '../tab3/commande/pending-cmd/confirm-procesing-order/confirm-procesing-order.component';
import { ExtrasPanelComponent } from './components/extras-panel/extras-panel.component';
import { ItemPendingToBuyOrderComponent } from '../tab2/pending-order-to-buy/item-pending-to-buy-order/item-pending-to-buy-order.component';
import { PaymentPendingOrderComponent } from '../tab2/pending-order-to-buy/payment-pending-order/payment-pending-order.component';

@NgModule({
  declarations: [
    ExtrasPanelComponent,
    NoDataComponent,
    NoFastFoodComponent,
    CardNewFastFoodComponent,

    PendingUserOrderComponent,
    ProcessingUserOrderComponent,
    FinishedUserOrderComponent,
    DeliveredOrderComponent,
    UserOrderItemComponent,
    ItemPendingToBuyOrderComponent,

    HeaderComponent,
    MarchandHeaderComponent,
    PendingOrderToBuyComponent,
    PaymentPendingOrderComponent,

    Component0Component,
    Component1Component,
    Component2Component,
    Component3Component,

    ConfirmProcesingOrderComponent,
    ConfirmProcesingOrderItem1Component,

    Item2Component,
    Item3Component,
    ProccessCmdComponent,
    FinishCmdComponent,

    MenuDesign2Component,

    FastFoodDesign1Component,
    FastFoodDesign2Component,
    FastFoodDesign3Component,
    FastFoodDesign4Component,

    FastFoodOrderComponent,
    ExpandableTextComponent,

    LoaderComponent,
    TextActionComponent,
  ],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [
    ExtrasPanelComponent,
    NoFastFoodComponent,
    CardNewFastFoodComponent,

    NoDataComponent,
    HeaderComponent,

    PendingOrderToBuyComponent,
    ItemPendingToBuyOrderComponent,
    MenuDesign2Component,

    MarchandHeaderComponent,
    FastFoodDesign1Component,
    FastFoodDesign2Component,
    FastFoodDesign3Component,
    FastFoodDesign4Component,

    ConfirmProcesingOrderComponent,

    PaymentPendingOrderComponent,
    ConfirmProcesingOrderItem1Component,

    Component0Component,
    Component1Component,
    Component2Component,
    Component3Component,

    FastFoodOrderComponent,
    ExpandableTextComponent,
    LoaderComponent,
    TextActionComponent,

    ProccessCmdComponent,
    FinishCmdComponent,
  ],
})
export class SharedModule {}
