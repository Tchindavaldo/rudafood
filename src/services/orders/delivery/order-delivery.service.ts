import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderDeliveryService {
  // BehaviorSubjects pour stocker les compteurs
  private deliveryOrdersSubject = new BehaviorSubject<OrderDeliveryKey>({ uniqueClientId: [], periodeKey: [] });
  private removedDeliveryOrdersSubject = new BehaviorSubject<OrderDeliveryKey>({ uniqueClientId: [], periodeKey: [] });

  // Pour les Sets, nous utilisons des arrays en interne pour éviter les problèmes de référence
  private activePeriodKeysSubject = new BehaviorSubject<string[]>([]);
  private activeClientIdsSubject = new BehaviorSubject<string[]>([]);

  // Observables publics pour que les composants puissent s'y abonner
  public deliveryOrders$: Observable<OrderDeliveryKey> = this.deliveryOrdersSubject.asObservable();
  public removedDeliveryOrders$: Observable<OrderDeliveryKey> = this.removedDeliveryOrdersSubject.asObservable();
  public activePeriodKeys$: Observable<string[]> = this.activePeriodKeysSubject.asObservable();
  public activeClientIds$: Observable<string[]> = this.activeClientIdsSubject.asObservable();

  // Sets locaux pour faciliter la gestion
  private activePeriodKeysSet: Set<string> = new Set<string>();
  private activeClientIdsSet: Set<string> = new Set<string>();

  constructor() {}

  // Méthodes pour mettre à jour les compteurs
  updateDeliveryOrders(result: OrderDeliveryKey): void {
    // Mettre à jour le BehaviorSubject
    this.deliveryOrdersSubject.next(result);

    // Synchroniser les Sets locaux avec les données reçues
    if (result.periodeKey && result.periodeKey.length > 0) {
      // Réinitialiser le Set des périodes actives
      this.activePeriodKeysSet.clear();

      // Ajouter les nouvelles périodes
      result.periodeKey.forEach(key => this.activePeriodKeysSet.add(key));

      // Mettre à jour le BehaviorSubject des périodes
      this.activePeriodKeysSubject.next(Array.from(this.activePeriodKeysSet));
      console.log('Périodes actives mises à jour via updateDeliveryOrders:', Array.from(this.activePeriodKeysSet));
    }

    if (result.uniqueClientId && result.uniqueClientId.length > 0) {
      // Réinitialiser le Set des clients actifs
      this.activeClientIdsSet.clear();

      // Ajouter les nouveaux clients
      result.uniqueClientId.forEach(id => this.activeClientIdsSet.add(id));

      // Mettre à jour le BehaviorSubject des clients
      this.activeClientIdsSubject.next(Array.from(this.activeClientIdsSet));
      console.log('Clients actifs mis à jour via updateDeliveryOrders:', Array.from(this.activeClientIdsSet));
    }
  }

  // Méthodes pour récupérer les valeurs actuelles
  getDeliveryOrders(): OrderDeliveryKey {
    return this.deliveryOrdersSubject.value;
  }

  getRemovedDeliveryOrders(): OrderDeliveryKey {
    return this.removedDeliveryOrdersSubject.value;
  }

  // Méthodes pour gérer les périodes actives
  addActivePeriodKey(periodKey: string): void {
    // Vérifier si la clé est déjà présente avant d'ajouter
    if (!this.activePeriodKeysSet.has(periodKey)) {
      // Ajouter au Set local
      this.activePeriodKeysSet.add(periodKey);

      // Convertir le Set en array et émettre
      const periodKeysArray = Array.from(this.activePeriodKeysSet);
      this.activePeriodKeysSubject.next(periodKeysArray);
      console.log('Périodes actives après ajout:', periodKeysArray);

      // Mettre à jour également la liste des periodeKey dans deliveryOrdersSubject
      const currentDeliveryOrders = this.deliveryOrdersSubject.value;
      if (!currentDeliveryOrders.periodeKey.includes(periodKey)) {
        currentDeliveryOrders.periodeKey.push(periodKey);
        this.deliveryOrdersSubject.next(currentDeliveryOrders);
      }
    }
  }

  removeActivePeriodKey(periodKey: string): void {
    // Supprimer du Set local
    this.activePeriodKeysSet.delete(periodKey);

    // Convertir le Set en array et émettre
    const periodKeysArray = Array.from(this.activePeriodKeysSet);
    this.activePeriodKeysSubject.next(periodKeysArray);
    console.log('Périodes actives après suppression:', periodKeysArray);

    // Mettre à jour également la liste des periodeKey dans deliveryOrdersSubject
    const currentDeliveryOrders = this.deliveryOrdersSubject.value;
    const index = currentDeliveryOrders.periodeKey.indexOf(periodKey);
    if (index !== -1) {
      currentDeliveryOrders.periodeKey.splice(index, 1);
      this.deliveryOrdersSubject.next(currentDeliveryOrders);
    }

    // Ajouter la période supprimée à removedDeliveryOrdersSubject
    const currentRemovedOrders = this.removedDeliveryOrdersSubject.value;
    if (!currentRemovedOrders.periodeKey.includes(periodKey)) {
      currentRemovedOrders.periodeKey.push(periodKey);
      this.removedDeliveryOrdersSubject.next(currentRemovedOrders);
      console.log('Période ajoutée aux supprimées:', periodKey);
    } else {
      console.log('Période déjà présente dans les supprimées. Liste actuelle:', currentRemovedOrders.periodeKey);
    }
  }

  getActivePeriodKeys(): string[] {
    return Array.from(this.activePeriodKeysSet);
  }

  isPeriodActive(periodKey: string): boolean {
    return this.activePeriodKeysSet.has(periodKey);
  }

  // Méthodes pour gérer les identifiants clients actifs
  addActiveClientId(clientId: string): void {
    // Vérifier si le client est déjà présent avant d'ajouter
    if (!this.activeClientIdsSet.has(clientId)) {
      // Ajouter au Set local
      this.activeClientIdsSet.add(clientId);

      // Convertir le Set en array et émettre
      const clientIdsArray = Array.from(this.activeClientIdsSet);
      this.activeClientIdsSubject.next(clientIdsArray);
      console.log('Client ajouté:', clientId);
    } else {
      console.log('Client déjà actif:', clientId);
    }
  }

  removeFromRemovedOrdersPeriod(periodKey: string): void {
    const currentRemovedOrders = this.removedDeliveryOrdersSubject.value;
    const index = currentRemovedOrders.periodeKey.indexOf(periodKey);
    if (index !== -1) {
      currentRemovedOrders.periodeKey.splice(index, 1);
      this.removedDeliveryOrdersSubject.next(currentRemovedOrders);
      console.log('Période retirée des supprimées:', periodKey);
    }
  }

  removeFromRemovedOrdersClient(clientId: string): void {
    const currentRemovedOrders = this.removedDeliveryOrdersSubject.value;
    const index = currentRemovedOrders.uniqueClientId.indexOf(clientId);
    if (index !== -1) {
      currentRemovedOrders.uniqueClientId.splice(index, 1);
      this.removedDeliveryOrdersSubject.next(currentRemovedOrders);
      console.log('Client retiré des supprimés:', clientId);
    }
  }

  removeActiveClientId(clientId: string): void {
    // Supprimer du Set local
    this.activeClientIdsSet.delete(clientId);

    // Convertir le Set en array et émettre
    const clientIdsArray = Array.from(this.activeClientIdsSet);
    this.activeClientIdsSubject.next(clientIdsArray);
    console.log('Clients actifs après suppression:', clientIdsArray);

    // Mettre à jour également la liste des uniqueClientId dans deliveryOrdersSubject
    const currentDeliveryOrders = this.deliveryOrdersSubject.value;
    const index = currentDeliveryOrders.uniqueClientId.indexOf(clientId);
    if (index !== -1) {
      currentDeliveryOrders.uniqueClientId.splice(index, 1);
      this.deliveryOrdersSubject.next(currentDeliveryOrders);
    }

    // Ajouter le client supprimé à removedDeliveryOrdersSubject
    const currentRemovedOrders = this.removedDeliveryOrdersSubject.value;
    if (!currentRemovedOrders.uniqueClientId.includes(clientId)) {
      currentRemovedOrders.uniqueClientId.push(clientId);
      this.removedDeliveryOrdersSubject.next(currentRemovedOrders);
      console.log('Client ajouté aux supprimés:', clientId);
    } else {
      console.log('Client déjà présent dans les supprimés. Liste actuelle:', currentRemovedOrders.uniqueClientId);
    }
  }

  getActiveClientIds(): string[] {
    return Array.from(this.activeClientIdsSet);
  }

  isClientActive(clientId: string): boolean {
    return this.activeClientIdsSet.has(clientId);
  }
}

export interface OrderDeliveryKey {
  uniqueClientId: any[];
  periodeKey: any[];
}
