import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagePassedOrderStatusPage } from './manage-passed-order-status.page';
import { PendingUserOrderComponent } from './pending-user-order/pending-user-order.component';
import { ProcessingUserOrderComponent } from './processing-user-order/processing-user-order.component';
import { FinishedUserOrderComponent } from './finished-user-order/finished-user-order.component';

const routes: Routes = [
  {
    path: '',
    component: ManagePassedOrderStatusPage,
    children: [
      // {
      //   path: '',
      //   redirectTo: 'pending',
      //   pathMatch: 'full'
      // },

      {
        path: 'user-pending-order-NoAnim',
        component: PendingUserOrderComponent,
        data: { animation: 'user-pending-order-NoAnim' },
      },

      {
        path: 'user-pending-order',
        component: PendingUserOrderComponent,
        data: { animation: 'user-pending-order' },
      },

      {
        path: 'user-proccessing-order',
        component: ProcessingUserOrderComponent,
        data: { animation: 'user-proccessing-order' },
      },

      {
        path: 'user-finished-order',
        component: FinishedUserOrderComponent,
        data: { animation: 'user-finished-order' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagePassedOrderStatusPageRoutingModule {}
