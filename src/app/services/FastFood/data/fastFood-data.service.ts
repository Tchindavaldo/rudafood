import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/indx';
// Removed deprecated import of isArray

@Injectable({
  providedIn: 'root',
})
export class fastFoodsDataService {
  private fastFoods!: any[];

  constructor(private store: Store<AppState>) {
    this.store.select(state => state.fastFoods.fastFoods).subscribe(fastFoods => (this.fastFoods = fastFoods));
  }

  getFastfoods = () => this.fastFoods;
}
