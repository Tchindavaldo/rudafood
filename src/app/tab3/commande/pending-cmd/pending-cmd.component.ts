/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getScreenHeight } from 'src/utils/getScreenHeight';
import { OrderDataService } from 'src/services/orders/data/order-data.service';
import { OrderCountersService } from 'src/services/orders/counters/order-counters.service';
import { AppState } from 'src/store/indx';
import * as moment from 'moment';
import { groupBy } from 'lodash';
import { sortAsc, sortDesc } from 'src/utils/sort-helpers';
import { formatDate } from '@angular/common';

interface OrderGroupByDate {
  noDelivery: Record<string, any[]>; // groupé par userId
  deliveryExpress: Record<string, any[]>; // groupé par userId
  deliveryTime: Record<string, Record<string, any[]>>; // {heure: {userId: orders[]}}
}

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

  screenHeight: number = getScreenHeight();

  pendingCmdGroupedCmdByDate: Record<string, OrderGroupByDate> = {};

  // Abonnement
  private subscription: Subscription = new Subscription();
  constructor(public ordersService: OrderDataService, private store: Store<AppState>, private orderCountersService: OrderCountersService) {}

  ngOnInit() {
    // S'abonner uniquement aux changements du compteur pour mettre à jour l'UI
    // Le composant parent (commande.page.ts) gère la mise à jour des données
    this.subscription.add(
      this.orderCountersService.pendingOrders$.subscribe(result => {
        this.pendingOrders = result.filteredOrders;
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

  // 1. Formater createdAt en date simple 'yyyy-MM-dd'
  formatDateCreated(createdAt: string | Date): string {
    return formatDate(createdAt, 'yyyy-MM-dd', 'fr-FR');
  }

  // 2. Extraire les dates uniques
  getUniqueDates(): string[] {
    const dates = this.pendingOrders.map(order => this.formatDateCreated(order.createdAt));
    return Array.from(new Set(dates)).sort();
  }

  // 3. Extraire commandes pour une date donnée
  getOrdersByDate(date: string): any[] {
    return this.pendingOrders.filter(order => this.formatDateCreated(order.createdAt) === date);
  }
  getUserIdsByDateType(status: boolean, date: string, type?: string, time?: string): string[] {
    const users = this.getOrdersByDate(date)
      .filter(order => {
        if (!status) {
          return order.delivery?.status === false;
        }

        const matchType = order.delivery?.type === type;
        const matchStatus = order.delivery?.status === true;
        const matchTime = time ? order.delivery?.time === time : true;

        return matchType && matchStatus && matchTime;
      })
      .map(order => order.userId);

    return Array.from(new Set(users));
  }

  // 5. Extraire commandes par date ET utilisateur
  getOrdersByDateAndUser(date: string, userId: string): any[] {
    return this.getOrdersByDate(date).filter(order => order.userId === userId);
  }

  getOrderByDeliveryType(date: string, status: boolean, type?: string): any[] {
    return this.getOrdersByDate(date).filter(order => {
      // Si le statut ne correspond pas, on filtre
      if (order.delivery?.status !== status) {
        return false;
      }

      // Si pas de type spécifié, on retourne toutes les commandes avec le bon statut
      if (!type) {
        return true;
      }

      // Vérification du type de livraison
      return order.delivery?.type === type;
    });
  }

  getOrdersByDateAndUserDelivery(date: string, userId: string, status: boolean, type?: string, time?: string): any[] {
    return this.getOrdersByDate(date).filter(order => {
      // Vérification de base : même utilisateur et statut correspondant
      if (order.userId !== userId || order.delivery?.status !== status) {
        return false;
      }

      // Si le statut est false, on retourne toutes les commandes avec delivery.status === false
      if (status === false) {
        return true;
      }

      // Si le statut est true, on filtre par type
      if (type === 'express') {
        return order.delivery?.type === 'express';
      } else if (type === 'time') {
        // Pour le type 'time', on vérifie aussi l'heure si elle est fournie
        const timeMatch = time ? order.delivery?.time === time : true;
        return order.delivery?.type === 'time' && timeMatch;
      }

      if (type === order.delivery?.type) {
        return true;
      }

      return false;
    });
  }
}
