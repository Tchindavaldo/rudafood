import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageDispoPageRoutingModule } from './page-dispo-routing.module';

import { PageDispoPage } from './page-dispo.page';
import { FormPageModule } from 'src/app/tab3/form/form.module';
import { Component3PageRoutingModule } from 'src/app/statComponents/component3/component3-routing.module';
import { Component2PageModule } from 'src/app/statComponents/component2/component2.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PageDispoPageRoutingModule, Component2PageModule, SharedModule, Component3PageRoutingModule, FormPageModule],
  declarations: [PageDispoPage],
})
export class PageDispoPageModule {}
