import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageDeletePage } from './page-delete.page';

const routes: Routes = [
  {
    path: '',
    component: PageDeletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageDeletePageRoutingModule {}
