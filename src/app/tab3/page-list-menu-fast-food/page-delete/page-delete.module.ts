import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageDeletePageRoutingModule } from './page-delete-routing.module';

import { PageDeletePage } from './page-delete.page';
import { FormPageModule } from 'src/app/tab3/form/form.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedModule2 } from 'src/app/shared/shared2.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PageDeletePageRoutingModule, SharedModule2, FormPageModule],
  declarations: [PageDeletePage],
})
export class PageDeletePageModule {}
