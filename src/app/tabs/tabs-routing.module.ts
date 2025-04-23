import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },


      // {
      //   path: 'tab3/historique',
      //   loadChildren: () => import('../tab3/historique/historique.module').then(m => m.HistoriquePageModule)
      // },


      {
        path: 'tab3',
        loadChildren: () => import('../manage/manage.module').then(m => m.ManagePageModule)
      },


      // {
      //   path: 'tab3/commande',
      //   loadChildren: () => import('../manage/page-list-cmd-fast-food/page-list-cmd-fast-food.module').then(m => m.PageListCmdFastFoodPageModule)
      // },


      {
        path: 'tab4',
        loadChildren: () => import('../tab4/tab4.module').then(m => m.Tab4PageModule)
      },
      {
        path: 'tab5',
        loadChildren: () => import('../tab5/tab5.module').then(m => m.Tab5PageModule)
      },

      // {
      //   path: 'tab3/menu',
      //   loadChildren: () => import('../manage/page-list-menu-fast-food/page-list-menu-fast-food.module').then(m => m.PageListMenuFastFoodPageModule)
      // },
      {
        path: 'sup',
        loadChildren: () => import('../manage/page-delete/page-delete-routing.module').then(m => m.PageDeletePageRoutingModule)
      },
      {
        path: 'dispo',
        loadChildren: () => import('../manage/page-dispo/page-dispo-routing.module').then(m => m.PageDispoPageRoutingModule)
      },



      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/auth',
    // redirectTo: '/rudavo',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
