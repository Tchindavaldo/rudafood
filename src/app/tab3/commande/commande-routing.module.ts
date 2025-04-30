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
      },
      {
        path: 'pending',
        component: PendingCmdComponent,
      },
      {
        path: 'proccess',
        component: ProccessCmdComponent,
      },
      {
        path: 'finish',
        component: FinishCmdComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommandePageRoutingModule {}
