import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageListMenuFastFoodPage } from './page-list-menu-fast-food.page';
import { NewMenuComponent } from './new-menu/new-menu.component';
import { ListMenuComponent } from './list-menu/list-menu.component';

const routes: Routes = [
  {
    path: '',
    component: PageListMenuFastFoodPage,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ListMenuComponent,
      },
      {
        path: 'new-menu',
        component: NewMenuComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageListMenuFastFoodPageRoutingModule {}
