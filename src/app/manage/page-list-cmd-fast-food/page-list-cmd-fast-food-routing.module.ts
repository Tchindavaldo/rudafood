import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageListCmdFastFoodPage } from './page-list-cmd-fast-food.page';
import { PendingCmdComponent } from './pending-cmd/pending-cmd.component';
import { FinishCmdComponent } from './finish-cmd/finish-cmd.component';
import { ProccessCmdComponent } from './proccess-cmd/proccess-cmd.component';

const routes: Routes = [
  {
    path: '',
    component: PageListCmdFastFoodPage,
    children: [

      {
        path: '',
        redirectTo: 'pending',
        pathMatch: 'full'
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





    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageListCmdFastFoodPageRoutingModule { }
