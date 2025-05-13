import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PannierBonnusPage } from './pannier-bonnus.page';

const routes: Routes = [
  {
    path: '',
    component: PannierBonnusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PannierBonnusPageRoutingModule {}
