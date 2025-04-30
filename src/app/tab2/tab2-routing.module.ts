import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';
import { BonusOrderBuyedComponent } from './bonus-order-buyed/bonus-order-buyed.component';
import { PendingOrderToBuyComponent } from './pending-order-to-buy/pending-order-to-buy.component';
import { ManagePassedOrderStatusPage } from './manage-passed-order-status/manage-passed-order-status.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
    children: [
      {
        path: 'status-order',
        loadChildren: () => import('./manage-passed-order-status/manage-passed-order-status.module').then(m => m.ManagePassedOrderStatusPageModule),
      },
      {
        path: 'pending-order-toBuy',
        component: PendingOrderToBuyComponent,
      },
      {
        path: 'bonus',
        component: BonusOrderBuyedComponent,
      },
      {
        path: '',
        redirectTo: 'pending-order-toBuy',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'manage-passed-order-status',
    loadChildren: () => import('./manage-passed-order-status/manage-passed-order-status.module').then(m => m.ManagePassedOrderStatusPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab2PageRoutingModule {}
