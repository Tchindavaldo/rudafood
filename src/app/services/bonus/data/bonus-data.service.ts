import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/indx';
// Removed deprecated import of isArray

@Injectable({
  providedIn: 'root',
})
export class bonusDataService {
  private bonus!: any[];

  constructor(private store: Store<AppState>) {
    this.store.select(state => state.bonus.bonus).subscribe(bonus => (this.bonus = bonus));
  }

  getbonus = () => this.bonus;
}
