import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getScreenHeight } from 'src/utils/getScreenHeight';
import { filterByArg } from 'src/utils/filterByArg';
import { OrderDataService } from 'src/services/orders/data/order-data.service';
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
import { UserOrderCountersService } from 'src/services/orders/counters/User-order-counters.service';
import { OrderDeliveryService } from 'src/services/orders/delivery/order-delivery.service';
import { sortByField } from 'src/utils/order-utils';

@Component({
  selector: 'app-finished-user-order',
  templateUrl: './finished-user-order.component.html',
  styleUrls: ['./finished-user-order.component.scss'],
})
export class FinishedUserOrderComponent implements OnInit, OnDestroy {
  finishOrder!: any[];
  fastFoodOrder!: Observable<any[]>;
  screenHeight: number = getScreenHeight();
  finishedOrdersCount: number = 0;
  totalAmount: number = 0;

  isUpdating: boolean = false;
  times: string[] = ['10:00', '13:45', '16:00'];

  // Stocker les identifiants des clients en cours de livraison avec leur date et type
  // Format: date_type_time_userId ou date_type_userId
  activeDeliveryClients: Set<string> = new Set<string>();

  // Stocker les périodes de livraison actives
  activeDeliveryPeriods: Set<string> = new Set<string>();

  // Abonnement
  private subscription: Subscription = new Subscription();

  constructor(
    public ordersService: OrderDataService,
    private store: Store<AppState>,
    private orderCountersService: UserOrderCountersService,
    private orderDeliveryService: OrderDeliveryService
  ) {}

  ngOnInit() {
    // S'abonner uniquement aux changements du compteur pour mettre à jour l'UI
    // Le composant parent (commande.page.ts) gère la mise à jour des données
    this.subscription.add(
      this.orderCountersService.finishedOrders$.subscribe(result => {
        result.filteredOrders.forEach(order => {
          if (order.delivery.type === 'time') console.log(' finiiissshhhee   ddde  dotot', order);

          if (order.periodKey && !this.activeDeliveryPeriods.has(order.periodKey)) {
            this.activeDeliveryPeriods.add(order.periodKey);
            console.log(' finiiissshhhee   ddde  dotot', order.periodKey);
          }

          if (order.clientId && !this.activeDeliveryClients.has(order.clientId)) {
            this.activeDeliveryClients.add(order.clientId);
            console.log(' finiiissshhhee   ddde  dotot', order.clientId);
          }
        });
        this.finishOrder = sortByField(result.filteredOrders, 'rank', 'asc');
      })
    );

    // S'abonner aux changements des périodes actives
    this.subscription.add(
      this.orderDeliveryService.activePeriodKeys$.subscribe(activePeriods => {
        // Fusionner les périodes actives du service avec les périodes existantes
        activePeriods.forEach(period => {
          if (!this.activeDeliveryPeriods.has(period)) {
            this.activeDeliveryPeriods.add(period);
          }
        });
        console.log('FinishedUserOrderComponent - Périodes actives mises à jour:', Array.from(this.activeDeliveryPeriods));
      })
    );

    // S'abonner aux changements des identifiants de client actifs via activeClientIds$
    this.subscription.add(
      this.orderDeliveryService.activeClientIds$.subscribe(activeClientIds => {
        // Fusionner les identifiants clients actifs du service avec les clients existants
        activeClientIds.forEach(clientId => {
          if (!this.activeDeliveryClients.has(clientId)) {
            this.activeDeliveryClients.add(clientId);
          }
        });
        console.log('FinishedUserOrderComponent - Clients actifs mis à jour:', Array.from(this.activeDeliveryClients));
      })
    );

    // S'abonner aux changements des identifiants de client et périodes via deliveryOrders$
    this.subscription.add(
      this.orderDeliveryService.deliveryOrders$.subscribe(deliveryOrders => {
        console.log('FinishedUserOrderComponent - deliveryOrders mis à jour:', deliveryOrders);
        // Mettre à jour les périodes actives depuis le service
        if (deliveryOrders.periodeKey && deliveryOrders.periodeKey.length > 0) {
          deliveryOrders.periodeKey.forEach(periodKey => {
            if (!this.activeDeliveryPeriods.has(periodKey)) {
              this.activeDeliveryPeriods.add(periodKey);
            }
          });
        }

        // Mettre à jour les identifiants clients actifs depuis le service
        if (deliveryOrders.uniqueClientId && deliveryOrders.uniqueClientId.length > 0) {
          deliveryOrders.uniqueClientId.forEach(clientId => {
            console.log('all id get', clientId);
            if (!this.activeDeliveryClients.has(clientId)) {
              this.activeDeliveryClients.add(clientId);
            }
          });
        }
      })
    );

    // S'abonner aux changements des identifiants de client et périodes supprimés via removedDeliveryOrders$
    this.subscription.add(
      this.orderDeliveryService.removedDeliveryOrders$.subscribe(removedDeliveryOrders => {
        console.log('FinishedUserOrderComponent - removedDeliveryOrders mis à jour:', removedDeliveryOrders);
        // Supprimer les périodes supprimées depuis le service
        if (removedDeliveryOrders.periodeKey && removedDeliveryOrders.periodeKey.length > 0) {
          removedDeliveryOrders.periodeKey.forEach((periodKey: string) => {
            this.activeDeliveryPeriods.delete(periodKey);
            console.log('Période supprimée:', periodKey);
            this.orderDeliveryService.removeFromRemovedOrdersPeriod(periodKey);
          });
        }

        // Supprimer les identifiants clients supprimés depuis le service
        if (removedDeliveryOrders.uniqueClientId && removedDeliveryOrders.uniqueClientId.length > 0) {
          removedDeliveryOrders.uniqueClientId.forEach((clientId: string) => {
            this.activeDeliveryClients.delete(clientId);
            console.log('Client supprimé:', clientId);
            this.orderDeliveryService.removeFromRemovedOrdersClient(clientId);
          });
        }
        // Appeler detectChanges pour s'assurer que l'UI est mise à jour
        // this.cdr.detectChanges();
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
    return getUniqueDates(this.finishOrder);
  }

  getOrdersByDate(date: string): any[] {
    return getOrdersByDate(this.finishOrder, date);
  }

  getUserIdsByDateType(status: boolean, date: string, type?: string, time?: string): string[] {
    return getUserIdsByDateType(this.finishOrder, status, date, type, time);
  }

  getOrdersByDateAndUser(date: string, userId: string): any[] {
    return this.getOrdersByDate(date).filter(order => order.userId === userId);
  }

  getOrderByDeliveryType(date: string, status: boolean, type?: string): any[] {
    return getOrdersByDate(this.finishOrder, date).filter(order => {
      if (order.delivery?.status !== status) {
        return false;
      }
      return !type || order.delivery?.type === type;
    });
  }

  getOrdersByDateAndUserDelivery(date: string, userId: string, status: boolean, type?: string, time?: string): any[] {
    return getOrdersByDateAndUserDelivery(this.finishOrder, date, userId, status, type, time);
  }

  getTotalOrdersByTypeTime(date: string, times: string[]): number {
    return getTotalOrdersByTypeTime(this.finishOrder, date, times);
  }

  getTotalOrdersByTypeExpress(date: string): number {
    return getTotalOrdersByTypeExpress(this.finishOrder, date);
  }

  getTotalOrdersByStatus(date: string, status: boolean): number {
    return getTotalOrdersByStatus(this.finishOrder, date, status);
  }

  getTotalOrdersForUser(type: string, date: string, userId: string, time: string | null = null): number {
    let orders = this.getOrdersByDate(date).filter(order => order.userId === userId);

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
    const userOrder = this.finishOrder.find(order => order.userId === userId && order.userData);

    const defaultUserData = {
      firstName: 'Client ',
      lastName: '',
      email: '',
      phoneNumber: '',
      photoUrl: '',
    };

    // console.log('user ');

    if (!userOrder) return defaultUserData;
    // if (userOrder.delivery.type === 'express') console.log('user express data', userOrder?.userData);

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

  /**
   * Génère un identifiant unique pour un client avec sa date et son type
   * @param date La date de la période
   * @param type Le type de livraison ('express' ou 'time')
   * @param clientId L'identifiant du client
   * @param time L'heure de la période (optionnel, uniquement pour le type 'time')
   * @returns L'identifiant unique du client
   */
  private getUniqueClientId(date: string, type: string, clientId: string, time?: string): string {
    return type === 'time' && time ? `${date}_${type}_${time}_${clientId}` : `${date}_${type}_${clientId}`;
  }

  /**
   * Démarre la livraison pour un client spécifique
   * @param clientId L'identifiant du client
   * @param date La date de la période
   * @param type Le type de livraison ('express' ou 'time')
   * @param time L'heure de la période (optionnel, uniquement pour le type 'time')
   */
  startDelivery(clientId: string, date: string, type: string = 'time', time?: string) {
    // Créer un identifiant unique pour ce client avec sa date et son type
    const uniqueClientId = this.getUniqueClientId(date, type, clientId, time);
    if (!this.activeDeliveryClients.has(uniqueClientId)) {
      this.activeDeliveryClients.add(uniqueClientId);
    }

    // Marquer la période comme active
    const periodKey = type === 'time' && time ? `${date}_${type}_${time}` : `${date}_${type}`;
    if (!this.activeDeliveryPeriods.has(periodKey)) {
      this.activeDeliveryPeriods.add(periodKey);
    }
  }

  /**
   * Vérifie si la livraison est active pour un client spécifique
   * @param clientId L'identifiant du client
   * @param date La date de la période (optionnel)
   * @param type Le type de livraison (optionnel)
   * @param time L'heure de la période (optionnel)
   * @returns true si la livraison est active pour ce client, false sinon
   */
  isDeliveryActive(clientId: string, date?: string, type?: string, time?: string): boolean {
    // Si nous avons tous les paramètres, nous pouvons vérifier l'ID unique
    if (date && type) {
      const uniqueId = this.getUniqueClientId(date, type, clientId, time);
      return this.activeDeliveryClients.has(uniqueId);
    }

    // Sinon, vérifier si le client est actif de n'importe quelle façon
    // (compatibilité arrière ou pour les tests)
    if (this.activeDeliveryClients.has(clientId)) {
      return true;
    }

    // Vérifier si le client est actif avec n'importe quelle combinaison de date/type
    return Array.from(this.activeDeliveryClients).some(id => id.endsWith(`_${clientId}`));
  }

  /**
   * Annule la livraison pour un client spécifique
   * @param clientId L'identifiant du client
   * @param date La date de la période (optionnel)
   * @param type Le type de livraison (optionnel)
   * @param time L'heure de la période (optionnel)
   */
  cancelDelivery(clientId: string, date?: string, type?: string, time?: string) {
    // Si nous avons tous les paramètres, nous pouvons supprimer l'ID unique
    if (date && type) {
      const uniqueId = this.getUniqueClientId(date, type, clientId, time);
      this.activeDeliveryClients.delete(uniqueId);
      return;
    }

    // Sinon, supprimer toutes les entrées pour ce client
    this.activeDeliveryClients.delete(clientId);

    // Supprimer toutes les entrées qui se terminent par l'ID du client
    Array.from(this.activeDeliveryClients)
      .filter(id => id.endsWith(`_${clientId}`))
      .forEach(id => this.activeDeliveryClients.delete(id));
  }

  /**
   * Termine la livraison pour un client spécifique
   * @param clientId L'identifiant du client
   * @param date La date de la période (optionnel)
   * @param type Le type de livraison (optionnel)
   * @param time L'heure de la période (optionnel)
   */
  completeDelivery(clientId: string, date?: string, type?: string, time?: string) {
    // Utiliser la même logique que pour l'annulation
    this.cancelDelivery(clientId, date, type, time);

    // Ici, on pourrait ajouter une logique supplémentaire pour marquer les commandes comme livrées
  }

  /**
   * Démarre la livraison pour tous les clients d'une période et d'un type spécifiques
   * @param date La date de la période
   * @param type Le type de livraison ('express' ou 'time')
   * @param time L'heure de la période (optionnel, uniquement pour le type 'time')
   */
  startDeliveryForPeriod(date: string, type: string = 'time', time?: string) {
    // Marquer la période comme active avec son type

    const periodKey = type === 'time' && time ? `${date}_${type}_${time}` : `${date}_${type}`;
    if (!this.activeDeliveryPeriods.has(periodKey)) {
      this.activeDeliveryPeriods.add(periodKey);
    }

    // Activer tous les clients de cette période et de ce type
    const userIds = this.getUserIdsByDateType(true, date, type, time);

    let userSorders: any[] = [];
    let orders: any[] = [];
    userIds.forEach(userId => {
      userSorders.push(...this.getOrdersByDateAndUserDelivery(date, userId, true, 'time', time));
    });
    userSorders.forEach(order => {
      orders.push({ status: order.status, id: order.id, fastFoodId: order.fastFoodId });
    });

    console.log('orders to update for delivery status', orders);
    // userIds.forEach(userId => {
    //    const uniqueClientId = this.getUniqueClientId(date, type, userId, time);
    //   this.activeDeliveryClients.add(uniqueClientId);
    // });
  }

  /**
   * Vérifie si la livraison est active pour une période et un type spécifiques
   * @param date La date de la période
   * @param type Le type de livraison ('express' ou 'time')
   * @param time L'heure de la période (optionnel, uniquement pour le type 'time')
   * @returns true si la livraison est active pour cette période et ce type, false sinon
   */
  isDeliveryPeriodActive(date: string, type: string = 'time', time?: string): boolean {
    // Vérifier uniquement si au moins un client de cette période et de ce type est en livraison
    const userIds = this.getUserIdsByDateType(true, date, type, time);
    const hasActiveClient = userIds.some(userId => {
      const uniqueClientId = this.getUniqueClientId(date, type, userId, time);
      return this.activeDeliveryClients.has(uniqueClientId);
    });

    // Si aucun client n'est actif, nettoyer la période
    const periodKey = type === 'time' && time ? `${date}_${type}_${time}` : `${date}_${type}`;

    if (!hasActiveClient && this.activeDeliveryPeriods.has(periodKey)) {
      this.activeDeliveryPeriods.delete(periodKey);
    }

    return hasActiveClient;
  }

  /**
   * Compte le nombre de livraisons actives pour une période donnée
   * @param date La date de la période
   * @param type Le type de livraison ('express' ou 'time')
   * @param time L'heure de la période (optionnel, uniquement pour le type 'time')
   * @returns Le nombre de livraisons actives
   */
  getActiveDeliveryCount(date: string, type: string = 'time', time?: string): number {
    const userIds = this.getUserIdsByDateType(true, date, type, time);
    let count = 0;

    userIds.forEach(userId => {
      const uniqueClientId = this.getUniqueClientId(date, type, userId, time);
      if (this.activeDeliveryClients.has(uniqueClientId)) {
        count++;
      }
    });

    return count;
  }
}
