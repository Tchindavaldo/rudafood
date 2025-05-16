import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { notificationDataService } from 'src/services/notifications/data/notification-data.service';
import { getUserNotificationService } from 'src/services/notifications/request/get-user-notification.service';
import { markNotificationAsReadService } from 'src/services/notifications/request/updater-notification-readStatus.service';
import { UserStorageService } from 'src/services/storgae/user-storage';
import { AppState } from 'src/store/indx';
import { markNotificationAsReadReducer, setNotificationReducer } from 'src/store/notification/notification-reducer';
import { markNotifcationAsRead } from 'src/utils/markNotifcationAsRead';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  constructor(
    private notificationService: getUserNotificationService,
    public notificationData: notificationDataService,
    private markNotificationAsRead: markNotificationAsReadService,
    private userStorage: UserStorageService,
    private store: Store<AppState>
  ) {}

  user!: any;
  selectedId = '';
  globalIndex = 0;
  isLoading = false;
  erroDataGeting = false;

  AllNotification!: any[];
  userNotification!: Observable<any[]>;

  ngOnInit(): void {
    this.fetchNotification();
  }

  async initUser() {
    this.user = await this.userStorage.get('user');
  }
  inCrementeIdx() {
    return this.globalIndex++;
  }
  resetGlobalIndex() {
    this.globalIndex = 0;
    return 0; // Ajoute ce retour pour que === 0 fonctionne
  }

  getAndIncrementGlobalIndex() {
    return this.globalIndex++;
  }
  trackByNotifId(index: number, item: any): any {
    return item.id;
  }

  markAsRead(notif: any): void {
    this.store.dispatch(
      markNotificationAsReadReducer({
        notificationId: notif.id,
        notificationCreatedAt: notif.createdAt,
        userId: this.user.uid,
      })
    );
    this.markNotificationAsRead.markNotificationAsRead(notif.id, notif.createdAt);
  }

  async fetchNotification() {
    try {
      this.isLoading = true;

      await this.initUser();
      await this.notificationService.getNotification();
      this.userNotification = this.store.select(state => state.userNotification.Notification);

      console.log(this.notificationData.getNotification());

      this.isLoading = false;
    } catch (error) {
      console.log(error);
      this.isLoading = false;
      this.erroDataGeting = true;
    }
  }

  showLabel(idxToGet2: string) {
    this.selectedId = idxToGet2;
  }
}
