import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommandePageRoutingModule } from './commande-routing.module';
import { CommandePage } from './commande.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedModule2 } from 'src/app/shared/shared2.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, SharedModule, CommandePageRoutingModule, SharedModule2],
  declarations: [CommandePage],
  providers: [DatePipe],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CommandePageModule {}
