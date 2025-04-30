import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule),
  },
  {
    path: 'auth-with-number',
    loadChildren: () => import('./pages/auth-with-number/auth-with-number.module').then(m => m.AuthWithNumberPageModule),
  },
  {
    path: 'auth-verify-number',
    loadChildren: () => import('./pages/auth-verify-number/auth-verify-number.module').then(m => m.AuthVerifyNumberPageModule),
  },
  {
    path: 'auth-with-google',
    loadChildren: () => import('./pages/auth-with-google/auth-with-google.module').then(m => m.AuthWithGooglePageModule),
  },
  {
    path: 'form',
    loadChildren: () => import('./tab3/form/form.module').then(m => m.FormPageModule),
  },

  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then(m => m.Tab4PageModule),
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then(m => m.Tab5PageModule),
  },
  {
    path: 'porte-feuil-historique',
    loadChildren: () => import('./homeComponents/porte-feuil-historique/porte-feuil-historique.module').then(m => m.PorteFeuilHistoriquePageModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
