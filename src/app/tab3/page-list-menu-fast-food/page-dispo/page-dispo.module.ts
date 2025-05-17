import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageDispoPageRoutingModule } from './page-dispo-routing.module';

import { PageDispoPage } from './page-dispo.page';
import { FormPageModule } from 'src/app/tab3/form/form.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedModule2 } from 'src/app/shared/shared2.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PageDispoPageRoutingModule, SharedModule2, FormPageModule],
  declarations: [PageDispoPage],
})
export class PageDispoPageModule {}
