import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/store/indx';
// Removed deprecated import of isArray

@Injectable({
  providedIn: 'root',
})
export class notificationDataService {
  private notification!: any[];

  constructor(private store: Store<AppState>) {
    this.store.select(state => state.userNotification.Notification).subscribe(notif => (this.notification = notif));
  }

  getNotification = () => this.notification;
}
