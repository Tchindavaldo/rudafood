import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CmdActionPage } from './cmd-action.page';

const routes: Routes = [
  {
    path: '',
    component: CmdActionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmdActionPageRoutingModule {}
