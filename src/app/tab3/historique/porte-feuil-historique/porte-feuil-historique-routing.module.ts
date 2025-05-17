import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PorteFeuilHistoriquePage } from './porte-feuil-historique.page';

const routes: Routes = [
  {
    path: '',
    component: PorteFeuilHistoriquePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PorteFeuilHistoriquePageRoutingModule {}
