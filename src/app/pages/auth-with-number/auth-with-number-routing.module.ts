import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthWithNumberPage } from './auth-with-number.page';

const routes: Routes = [
  {
    path: '',
    component: AuthWithNumberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthWithNumberPageRoutingModule {}
