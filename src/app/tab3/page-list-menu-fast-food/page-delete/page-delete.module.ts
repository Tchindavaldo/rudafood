import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageDeletePageRoutingModule } from './page-delete-routing.module';

import { PageDeletePage } from './page-delete.page';
import { Component2PageModule } from 'src/app/statComponents/component2/component2.module';
import { Component3PageRoutingModule } from 'src/app/statComponents/component3/component3-routing.module';
import { FormPageModule } from 'src/app/tab3/form/form.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PageDeletePageRoutingModule, Component2PageModule, SharedModule, Component3PageRoutingModule, FormPageModule],
  declarations: [PageDeletePage],
})
export class PageDeletePageModule {}
