import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';
const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
    children: [
      {
        path: '',
        redirectTo: 'commande',
        pathMatch: 'full',
      },
      {
        path: 'form',
        loadChildren: () => import('./form/form.module').then(m => m.FormPageModule),
      },
      {
        path: 'commande',
        loadChildren: () => import('./commande/commande.module').then(m => m.CommandePageModule),
      },
      {
        path: 'historique',
        loadChildren: () => import('./historique/historique.module').then(m => m.HistoriquePageModule),
      },
      {
        path: 'menu',
        loadChildren: () => import('./page-list-menu-fast-food/page-list-menu-fast-food.module').then(m => m.PageListMenuFastFoodPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab3PageRoutingModule {}
