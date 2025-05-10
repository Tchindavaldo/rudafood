import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PannierAchatOrPage } from './pannier-achat-or.page';

const routes: Routes = [
  {
    path: '',
    component: PannierAchatOrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PannierAchatOrPageRoutingModule {}
