import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageListMenuFastFoodPage } from './page-list-menu-fast-food.page';
import { ListMenuComponent } from './list-menu/list-menu.component';
import { NewMenuComponent } from './new-menu/new-menu.component';
import { PageModifyComponent } from './page-modify/page-modify.component';

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
        path: 'disponibilite',
        loadChildren: () => import('./page-dispo/page-dispo.module').then(m => m.PageDispoPageModule),
      },
      {
        path: 'modification',
        component: PageModifyComponent,
      },
      {
        path: 'suppression',
        loadChildren: () => import('./page-delete/page-delete.module').then(m => m.PageDeletePageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageListMenuFastFoodPageRoutingModule {}
