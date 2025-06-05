import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getScreenHeight } from 'src/utils/getScreenHeight';
import { filterByArg } from 'src/utils/filterByArg';
import { countOrders, OrderCountResult } from 'src/utils/countOrders';
import { getOrdersService } from 'src/services/orders/get/get-orders.service';
import { OrderDataService } from 'src/services/orders/data/order-data.service';
import { OrderCountersService } from 'src/services/orders/counters/order-counters.service';
import { AppState } from 'src/store/indx';
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

@Component({
  selector: 'app-proccess-cmd',
  templateUrl: './proccess-cmd.component.html',
  styleUrls: ['./proccess-cmd.component.scss'],
})
export class ProccessCmdComponent implements OnInit, OnDestroy {
  proccessOrder: any[] = [];
  fastFoodOrder!: Observable<any[]>;
  screenHeight: number = getScreenHeight(); // Dynamically set screen height
  processingOrdersCount: number = 0;
  totalAmount: number = 0;
  result!: OrderCountResult;
  times: string[] = ['10:00', '16:00', '13:45'];

  // Abonnement
  private subscription: Subscription = new Subscription();

  constructor(public ordersService: OrderDataService, private store: Store<AppState>, private orderCountersService: OrderCountersService) {}

  ngOnInit() {
    // S'assurer que this.result est défini avant de l'utiliser dans le deuxième abonnement
    this.subscription.add(
      this.orderCountersService.processingOrders$.subscribe(result => {
        this.proccessOrder = result.filteredOrders;
      })
    );
  }

  ngOnDestroy() {
    // Se désabonner pour éviter les fuites de mémoire
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
    return getUniqueDates(this.proccessOrder);
  }

  getOrdersByDate(date: string): any[] {
    return getOrdersByDate(this.proccessOrder, date);
  }

  getUserIdsByDateType(status: boolean, date: string, type?: string, time?: string): string[] {
    return getUserIdsByDateType(this.proccessOrder, status, date, type, time);
  }

  getOrdersByDateAndUser(date: string, userId: string): any[] {
    return this.getOrdersByDate(date).filter(order => order.userId === userId);
  }

  getOrderByDeliveryType(date: string, status: boolean, type?: string): any[] {
    return getOrdersByDate(this.proccessOrder, date).filter(order => {
      if (order.delivery?.status !== status) {
        return false;
      }
      return !type || order.delivery?.type === type;
    });
  }

  getOrdersByDateAndUserDelivery(date: string, userId: string, status: boolean, type?: string, time?: string): any[] {
    return getOrdersByDateAndUserDelivery(this.proccessOrder, date, userId, status, type, time);
  }

  getTotalOrdersByTypeTime(date: string, times: string[]): number {
    return getTotalOrdersByTypeTime(this.proccessOrder, date, times);
  }

  getTotalOrdersByTypeExpress(date: string): number {
    return getTotalOrdersByTypeExpress(this.proccessOrder, date);
  }

  getTotalOrdersByStatus(date: string, status: boolean): number {
    return getTotalOrdersByStatus(this.proccessOrder, date, status);
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
    const userOrder = this.proccessOrder.find(order => order.userId === userId);

    // Valeurs par défaut si l'objet n'existe pas
    const defaultUserData = {
      firstName: 'Client',
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

  getOrderWithLongMenuName(order: any): any {
    return {
      ...order,
      menu: {
        ...order.menu,
        name: 'menu mis update avec photo',
      },
    };
  }
}
