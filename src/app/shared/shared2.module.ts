import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { BonusComponent } from '../tab2/bonus-order-buyed/bonus/bonus.component';
import { SharedModule } from './shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BonusComponent],
  imports: [CommonModule, IonicModule, FormsModule, SharedModule, RouterModule],
  exports: [BonusComponent],
})
export class SharedModule2 {}
