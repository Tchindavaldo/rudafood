import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderCountResult } from 'src/utils/countOrders';

@Injectable({
  providedIn: 'root',
})
export class OrderCountersService {
  // BehaviorSubjects pour stocker les compteurs
  private pendingOrdersSubject = new BehaviorSubject<OrderCountResult>({ count: 0, totalAmount: 0, filteredOrders: [] });
  private processingOrdersSubject = new BehaviorSubject<OrderCountResult>({ count: 0, totalAmount: 0, filteredOrders: [] });
  private finishedOrdersSubject = new BehaviorSubject<OrderCountResult>({ count: 0, totalAmount: 0, filteredOrders: [] });
  private deliveredOrdersSubject = new BehaviorSubject<OrderCountResult>({ count: 0, totalAmount: 0, filteredOrders: [] });

  // Observables publics pour que les composants puissent s'y abonner
  public pendingOrders$: Observable<OrderCountResult> = this.pendingOrdersSubject.asObservable();
  public processingOrders$: Observable<OrderCountResult> = this.processingOrdersSubject.asObservable();
  public finishedOrders$: Observable<OrderCountResult> = this.finishedOrdersSubject.asObservable();
  public deliveredOrders$: Observable<OrderCountResult> = this.deliveredOrdersSubject.asObservable();

  constructor() {}

  // Méthodes pour mettre à jour les compteurs
  updatePendingOrders(result: OrderCountResult): void {
    this.pendingOrdersSubject.next(result);
  }

  updateProcessingOrders(result: OrderCountResult): void {
    this.processingOrdersSubject.next(result);
  }

  updateFinishedOrders(result: OrderCountResult): void {
    this.finishedOrdersSubject.next(result);
  }

  updateDeliveredOrders(result: OrderCountResult): void {
    this.deliveredOrdersSubject.next(result);
  }

  // Méthodes pour récupérer les valeurs actuelles
  getPendingOrders(): OrderCountResult {
    return this.pendingOrdersSubject.value;
  }

  getProcessingOrders(): OrderCountResult {
    return this.processingOrdersSubject.value;
  }

  getFinishedOrders(): OrderCountResult {
    return this.finishedOrdersSubject.value;
  }

  getDeliveredOrders(): OrderCountResult {
    return this.deliveredOrdersSubject.value;
  }
}
