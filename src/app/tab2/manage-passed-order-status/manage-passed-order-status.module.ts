import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagePassedOrderStatusPageRoutingModule } from './manage-passed-order-status-routing.module';

import { ManagePassedOrderStatusPage } from './manage-passed-order-status.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [CommonModule, IonicModule, ManagePassedOrderStatusPageRoutingModule, SharedModule],
  declarations: [ManagePassedOrderStatusPage],
})
export class ManagePassedOrderStatusPageModule {}
