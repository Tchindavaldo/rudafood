import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommandePage } from './commande.page';
import { PendingCmdComponent } from './pending-cmd/pending-cmd.component';
import { ProccessCmdComponent } from './proccess-cmd/proccess-cmd.component';
import { FinishCmdComponent } from './finish-cmd/finish-cmd.component';

const routes: Routes = [
  {
    path: '',
    component: CommandePage,
    children: [
      // {
      //   path: '',
      //   redirectTo: 'pending',
      //   pathMatch: 'full',
      // },

      {
        path: 'pending-noAnim',
        component: PendingCmdComponent,
        data: { animation: 'fastFood-pending-order-NoAnim' },
      },
      {
        path: 'pending',
        component: PendingCmdComponent,
        data: { animation: 'fastFood-pending-order' },
      },
      {
        path: 'proccess',
        component: ProccessCmdComponent,
        data: { animation: 'fastFood-proccessing-order' },
      },
      {
        path: 'finish',
        component: FinishCmdComponent,
        data: { animation: 'fastFood-finished-order' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommandePageRoutingModule {}
