import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { getOrdersService } from 'src/services/orders/get/get-orders.service';
import { UserStorageService } from 'src/services/storgae/user-storage';
import { AppState } from 'src/store/indx';
import { countOrders } from 'src/utils/countOrders';
import { OrderDataService } from 'src/services/orders/data/order-data.service';
import { OrderCountersService } from 'src/services/orders/counters/order-counters.service';
import { fastFoodOrderRouteAnimation } from 'src/app/animations/fastfood-order-route-animations';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.page.html',
  styleUrls: ['./commande.page.scss'],
  animations: [fastFoodOrderRouteAnimation],
})
export class CommandePage implements OnInit, OnDestroy {
  userData: any;
  selectedChip = 'pending';
  fastFoodOrder!: Observable<any[]>; // Utilisation d'un Observable
  private ffOrder!: any[];
  currentDate!: string;

  // Compteurs pour les commandes
  totalOrder: number = 0;
  totalAmount: number = 0;

  // Abonnements
  private countersSubscription: Subscription = new Subscription();
  private currentCounterSubscription: Subscription | null = null; // Pour gérer la souscription dynamique

  constructor(
    private user: UserStorageService,
    private router: Router,
    private getOrdersService: getOrdersService,
    public orderData: OrderDataService,
    private store: Store<AppState>,
    private orderCountersService: OrderCountersService
  ) {}

  async ngOnInit() {
    this.userData = await this.user.get('user');
    this.selectChip(this.selectedChip); // Abonnement dynamique sur l'onglet actif au démarrage
    this.fetchFastFoodOrders();
    this.formatCurrentDate();
  }

  ngOnDestroy() {
    // Se désabonner pour éviter les fuites de mémoire
    if (this.countersSubscription) {
      this.countersSubscription.unsubscribe();
    }
  }

  selectChip(chipId: string) {
    this.selectedChip = chipId;
    // Désabonner l'ancien compteur
    if (this.currentCounterSubscription) {
      this.currentCounterSubscription.unsubscribe();
    }
    // S'abonner au bon observable selon le chip sélectionné
    let obs$;
    if (chipId === 'pending') {
      obs$ = this.orderCountersService.pendingOrders$;
    } else if (chipId === 'proccess') {
      obs$ = this.orderCountersService.processingOrders$;
    } else if (chipId === 'finish') {
      obs$ = this.orderCountersService.finishedOrders$;
    }

    // Vérifier que obs$ est défini avant de s'abonner
    if (obs$) {
      this.currentCounterSubscription = obs$.subscribe({
        next: result => {
          this.totalOrder = result.count;
          this.totalAmount = result.totalAmount;
        },
        error: err => console.error('Erreur lors de la souscription:', err),
      });
    }
  }

  isSelected(chipId: string): boolean {
    return this.selectedChip === chipId;
  }
  handleStoreOrder = (Date: Date, orders: any[]) => {
    // Calculer le nombre de commandes en attente avec la date du jour
    const result = countOrders(orders, Date);
    const processResult = countOrders(orders, Date, 'processing');
    const finishResult = countOrders(orders, Date, 'finished');

    // Mettre à jour le service de compteurs
    this.orderCountersService.updatePendingOrders(result);
    this.orderCountersService.updateProcessingOrders(processResult);
    this.orderCountersService.updateFinishedOrders(finishResult);
  };
  async fetchFastFoodOrders() {
    try {
      this.fastFoodOrder = this.store.select(state => state.fastFoodOrder.orders);
      this.fastFoodOrder.subscribe(orders => {
        this.ffOrder = orders;
        this.handleStoreOrder(new Date(), this.ffOrder);
        console.log('changemen detecter depuis commande.ts');
      });
      if (this.ffOrder !== null) {
        this.router.navigate(['tabs/tab3/commande/pending-noAnim']);
      } else {
        await this.getOrdersService.getFastFoodOrders();
        this.router.navigate(['tabs/tab3/commande/pending-noAnim']);
      }
    } catch (error) {
      console.error('Erreur', error);
    }
  }

  /**
   * Méthode pour compter les commandes en attente selon la date de réception
   * Si la date de réception est inférieure ou égale à aujourd'hui, on filtre les commandes avec date <= aujourd'hui
   * Si la date de réception est supérieure à aujourd'hui, on filtre les commandes avec date == date fournie
   */

  getAnimationData(outlet: any): string {
    const animationKey = outlet?.activatedRouteData?.animation;
    // console.log('Animation Data:', animationKey); // Ajoute un log pour voir la clé d'animation
    return animationKey;
  }

  formatCurrentDate() {
    const date = new Date();
    const day = date.getDate();

    // Tableau des mois en français avec majuscule
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

    const month = months[date.getMonth()];
    const year = date.getFullYear();

    this.currentDate = `${day} ${month} ${year}`;
  }
}
