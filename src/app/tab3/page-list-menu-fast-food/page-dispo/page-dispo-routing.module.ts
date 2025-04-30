import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageDispoPage } from './page-dispo.page';

const routes: Routes = [
  {
    path: '',
    component: PageDispoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageDispoPageRoutingModule {}
