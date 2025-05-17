import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/indx';
import { DataService } from 'src/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-modify',
  templateUrl: './page-modify.component.html',
  styleUrls: ['./page-modify.component.scss'],
})
export class PageModifyComponent implements OnInit {
  menuTab!: Observable<any>;
  constructor(public dataGet: DataService, private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.fetchMenu();
  }

  redirect(path: string) {
    this.router.navigate([path]);
  }
  fetchMenu = async () => {
    this.menuTab = this.store.select(state => state.menu.menuTab);
  };

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
