/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getScreenHeight } from 'src/utils/getScreenHeight';
import {
  OrderGroupByDate,
  formatDateCreated,
  getUniqueDates,
  getOrdersByDate,
  getUserIdsByDateType,
  getOrdersByDateAndUserDelivery,
  getTotalOrdersByTypeTime,
  getTotalOrdersByTypeExpress,
  getTotalOrdersByStatus,
} from 'src/utils/order-utils';
import { OrderDataService } from 'src/services/orders/data/order-data.service';
import { AppState } from 'src/store/indx';
import { OrderCountersService } from 'src/services/orders/counters/order-counters.service';
import { sortAsc, sortDesc } from 'src/utils/sort-helpers';
import { showCard } from 'src/utils/showCard';
import { sortByField } from 'src/utils/order-utils';

@Component({
  selector: 'app-pending-cmd',
  templateUrl: './pending-cmd.component.html',
  styleUrls: ['./pending-cmd.component.scss'],
})
export class PendingCmdComponent implements OnInit, OnDestroy {
  sortDesc = sortDesc;
  sortAsc = sortAsc;

  totalAmount: number = 0;
  pendingOrdersCount: number = 0;
  pendingOrders!: any[];
  times: string[] = ['10:00', '16:00', '13:45'];

  screenHeight: number = getScreenHeight();

  order!: any;

  isUpdating = false;

  pendingCmdGroupedCmdByDate: Record<string, OrderGroupByDate> = {};

  // Abonnement
  private subscription: Subscription = new Subscription();
  constructor(private store: Store<AppState>, private orderCountersService: OrderCountersService) {}

  ngOnInit() {
    // S'abonner uniquement aux changements du compteur pour mettre à jour l'UI
    // Le composant parent (commande.page.ts) gère la mise à jour des données
    this.subscription.add(
      this.orderCountersService.pendingOrders$.subscribe(result => {
        // if (result.filteredOrders && result.filteredOrders.length > 0) {
        //   for (const order of result.filteredOrders) {
        //     if (order.delivery && order.delivery.date) {
        //       console.log('Delivery date:', order.delivery.date);
        //     }
        //   }
        // }

        console.log('result', result);

        this.pendingOrders = sortByField(result.filteredOrders || [], 'rank', 'asc');
      })
    );
  }

  ngOnDestroy() {
    // Se désabonner pour éviter les fuites de mémoire
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showDispoCard(order: any) {
    this.order = order;
    console.log('order recu ', this.order);

    showCard('confirmPendingOrder');
  }

  // Utilisé pour trackBy
  trackByOrderId(index: number, order: any) {
    return order.id;
  }

  // Méthodes wrapper pour utiliser les fonctions du service avec les données du composant
  formatDateCreated(createdAt: string | Date): string {
    return formatDateCreated(createdAt);
  }

  getUniqueDates(): string[] {
    return getUniqueDates(this.pendingOrders);
  }

  getOrdersByDate(date: string): any[] {
    return getOrdersByDate(this.pendingOrders, date);
  }

  getUserIdsByDateType(status: boolean, date: string, type?: string, time?: string): string[] {
    return getUserIdsByDateType(this.pendingOrders, status, date, type, time);
  }

  getOrdersByDateAndUser(date: string, userId: string): any[] {
    return this.getOrdersByDate(date).filter(order => order.userId === userId);
  }

  getOrderByDeliveryType(date: string, status: boolean, type?: string): any[] {
    return getOrdersByDate(this.pendingOrders, date).filter(order => {
      if (order.delivery?.status !== status) {
        return false;
      }
      return !type || order.delivery?.type === type;
    });
  }

  getOrdersByDateAndUserDelivery(date: string, userId: string, status: boolean, type?: string, time?: string): any[] {
    return getOrdersByDateAndUserDelivery(this.pendingOrders, date, userId, status, type, time);
  }

  getTotalOrdersByTypeTime(date: string, times: string[]): number {
    return getTotalOrdersByTypeTime(this.pendingOrders, date, times);
  }

  getTotalOrdersByTypeExpress(date: string): number {
    return getTotalOrdersByTypeExpress(this.pendingOrders, date);
  }

  getTotalOrdersByStatus(date: string, status: boolean): number {
    return getTotalOrdersByStatus(this.pendingOrders, date, status);
  }

  getTotalOrdersForUser(type: string, date: string, userId: string, time: string | null = null): number {
    // Filtrer d'abord par date et utilisateur
    let orders = this.getOrdersByDate(date).filter(order => order.userId === userId);

    // Si le paramètre time est fourni (non null), filtrer également par temps
    if (type !== '') {
      orders = orders.filter(order => order?.delivery?.type === type);
    }
    if (time !== null) {
      orders = orders.filter(order => order?.delivery?.time === time);
    }

    if (type === '' && time === null) {
      orders = orders.filter(order => order?.delivery?.status === false);
    }

    return orders.length;
  }

  // Obtenir les données complètes de l'utilisateur
  getUserData(userId: string): any {
    const userOrder = this.pendingOrders.find(order => order.userId === userId);

    const defaultUserData = {
      firstName: 'Client ',
      lastName: '',
      email: '',
      phoneNumber: '',
      photoUrl: '',
    };

    if (!userOrder) return defaultUserData;

    return {
      firstName: userOrder?.userData?.firstName || defaultUserData.firstName,
      lastName: userOrder?.userData?.lastName || defaultUserData.lastName,
      email: userOrder?.userData?.email || defaultUserData.email,
      phoneNumber: userOrder?.userData?.phoneNumber || defaultUserData.phoneNumber,
      photoUrl: userOrder?.userData?.photoUrl || defaultUserData.photoUrl,
    };
  }

  // Obtenir le numéro de téléphone de l'utilisateur (pour compatibilité)
  getUserPhoneNumber(userId: string): string {
    return this.getUserData(userId).phoneNumber;
  }
}
