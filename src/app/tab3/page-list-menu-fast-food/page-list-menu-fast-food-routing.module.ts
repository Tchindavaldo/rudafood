import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageListMenuFastFoodPage } from './page-list-menu-fast-food.page';

const routes: Routes = [
  {
    path: '',
    component: PageListMenuFastFoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageListMenuFastFoodPageRoutingModule {}
