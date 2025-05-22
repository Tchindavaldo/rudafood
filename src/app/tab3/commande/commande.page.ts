import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
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
import { IonDatetime, IonInput } from '@ionic/angular';

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

  // Gestion des dates
  selectedDate: Date = new Date();
  nextDays: Array<{ day: string; date: number; fullDate: Date }> = [];
  minDate = new Date().toISOString();
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString();
  private orderDates = new Set<string>();

  // Vérifie si deux dates sont le même jour
  isSameDay(date1: string | Date, date2: Date): boolean {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
  }

  // Formate une date de manière relative (aujourd'hui, demain, cette semaine, etc.)
  getRelativeDate(date: Date): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "aujourd'hui";
    if (diffDays === 1) return 'demain';
    if (diffDays === 2) return 'après-demain';

    // Cette semaine (du lundi au dimanche)
    const dayOfWeek = targetDate.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Lundi de cette semaine
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (7 - today.getDay())); // Dimanche de cette semaine

    if (targetDate >= startOfWeek && targetDate <= endOfWeek) {
      return 'cette semaine';
    }

    // La semaine prochaine
    const nextWeekStart = new Date(startOfWeek);
    nextWeekStart.setDate(startOfWeek.getDate() + 7);
    const nextWeekEnd = new Date(endOfWeek);
    nextWeekEnd.setDate(endOfWeek.getDate() + 7);

    if (targetDate >= nextWeekStart && targetDate <= nextWeekEnd) {
      return 'semaine prochaine';
    }

    // Dans 2 semaines
    const inTwoWeeksStart = new Date(nextWeekStart);
    inTwoWeeksStart.setDate(nextWeekStart.getDate() + 7);
    const inTwoWeeksEnd = new Date(nextWeekEnd);
    inTwoWeeksEnd.setDate(nextWeekEnd.getDate() + 7);

    if (targetDate >= inTwoWeeksStart && targetDate <= inTwoWeeksEnd) {
      return 'dans 2 semaines';
    }

    // Mois actuels et suivants
    const monthNames = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    const currentYear = today.getFullYear();
    const targetYear = targetDate.getFullYear();

    // Pour le mois en cours
    if (targetDate.getMonth() === today.getMonth() && targetYear === currentYear) {
      return 'ce mois-ci';
    }

    // Pour le mois prochain
    if (
      (targetDate.getMonth() === today.getMonth() + 1 || (today.getMonth() === 11 && targetDate.getMonth() === 0)) &&
      (targetYear === currentYear || (today.getMonth() === 11 && targetYear === currentYear + 1))
    ) {
      return 'le mois prochain';
    }

    // Pour les autres cas, retourne le mois et l'année
    return `en ${monthNames[targetDate.getMonth()]} ${targetYear !== currentYear ? targetYear : ''}`.trim();
  }

  // Compteurs pour les commandes
  totalOrder: number = 0;
  totalPendingOrder: number = 0;
  totalProcessingOrder: number = 0;
  totalFinishedOrder: number = 0;
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
    this.initializeDates();
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

    const pendingObs = this.orderCountersService.pendingOrders$;
    const processingObs = this.orderCountersService.processingOrders$;
    const finishedObs = this.orderCountersService.finishedOrders$;

    pendingObs.subscribe(result => {
      this.totalPendingOrder = result.count;
    });
    processingObs.subscribe(result => {
      this.totalProcessingOrder = result.count;
    });
    finishedObs.subscribe(result => {
      this.totalFinishedOrder = result.count;
    });

    // Vérifier que obs$ est défini avant de s'abonner
    if (obs$) {
      this.currentCounterSubscription = obs$.subscribe({
        next: result => {
          this.totalOrder = result.count;
          this.totalAmount = result.totalAmount;
          if (chipId === 'pending') {
            this.totalPendingOrder = result.count;
          } else if (chipId === 'proccess') {
            this.totalProcessingOrder = result.count;
          } else if (chipId === 'finish') {
            this.totalFinishedOrder = result.count;
          }
        },
        error: err => console.error('Erreur lors de la souscription:', err),
      });
    }
  }

  isSelected(chipId: string): boolean {
    return this.selectedChip === chipId;
  }
  handleStoreOrder = (Date: Date, orders: any[]) => {
    // console.log('appeler avec date ', Date);

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
        // console.log('Changement détecté depuis commande.ts', orders);

        this.ffOrder = orders;
        if (orders !== null) {
          this.handleStoreOrder(this.selectedDate, this.ffOrder);
          this.processOrderDates(orders);
          this.initializeDates();
        }
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

  getAnimationData(outlet: any): string {
    const animationKey = outlet?.activatedRouteData?.animation;
    // console.log('Animation Data:', animationKey); // Ajoute un log pour voir la clé d'animation
    return animationKey;
  }

  formatCurrentDate() {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    this.currentDate = new Date().toLocaleDateString('fr-FR', options);
    // Mettre à jour la date sélectionnée avec aujourd'hui
    this.selectedDate = new Date();
  }

  private processOrderDates(orders: any[]) {
    // console.log('=== Début de processOrderDates ===');
    // console.log(`Nombre total de commandes à traiter: ${orders.length}`);

    this.orderDates.clear();
    const today = new Date();
    // Utiliser UTC pour éviter les problèmes de fuseau horaire
    const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));

    // Toujours ajouter la date du jour
    const todayStr = todayUTC.toISOString().split('T')[0];
    this.orderDates.add(todayStr);
    // console.log('Date du jour ajoutée par défaut:', todayStr);
    // console.log(`Date du jour (local): ${today.toISOString()}`);
    // console.log(`Date du jour (UTC): ${todayUTC.toISOString()}`);

    orders.forEach((order, index) => {
      // console.log(`\n--- Traitement commande ${index + 1} ---`);
      // console.log('ID commande:', order.id || order._id || 'inconnu');
      // console.log('Données complètes:', order);

      let deliveryDate: Date | null = null;
      let hasDeliveryDate = false;

      if (order.delivery?.date) {
        // console.log('Date de livraison brute:', order.delivery.date);
        try {
          // Essayer de parser la date directement (pour le format ISO)
          const parsedDate = new Date(order.delivery.date);

          if (!isNaN(parsedDate.getTime())) {
            // Si la date est valide au format ISO
            deliveryDate = new Date(Date.UTC(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate()));
            hasDeliveryDate = true;
          } else {
            // Essayer le format YYYY-MM-DD
            const dateParts = order.delivery.date.split('T')[0].split('-');
            if (dateParts.length === 3) {
              const [year, month, day] = dateParts.map(Number);
              if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
                deliveryDate = new Date(Date.UTC(year, month - 1, day));
                hasDeliveryDate = true;
              }
            }
          }

          if (!hasDeliveryDate) {
            console.error('Format de date non reconnu:', order.delivery.date);
          } else {
            // console.log('Date de livraison convertie (UTC):', deliveryDate.toISOString());
          }
        } catch (error) {
          console.error('Erreur lors du parsing de la date:', error);
        }
      } else {
        // console.log('Aucune date de livraison trouvée pour cette commande');
      }

      // Si on a une date de livraison valide
      if (deliveryDate) {
        // console.log('Vérification de la date de livraison:');
        // console.log('- Date de livraison:', deliveryDate.toISOString());
        // console.log('- Date de référence (todayUTC):', todayUTC.toISOString());

        // Vérifier si la date est aujourd'hui ou dans le futur
        if (deliveryDate >= todayUTC) {
          const dateStr = deliveryDate.toISOString().split('T')[0];
          // console.log(`✅ Date à ajouter: ${dateStr}`);
          this.orderDates.add(dateStr);
          // console.log(`Dates uniques après ajout:`, Array.from(this.orderDates));
        } else {
          // console.log('❌ Date trop ancienne, ignorée');
        }
      } else {
        console.log('❌ Aucune date de livraison valide pour cette commande');
      }
    });

    // S'assurer que la date du jour est toujours présente
    if (!this.orderDates.has(todayStr)) {
      this.orderDates.add(todayStr);
      console.log('Date du jour ajoutée à la fin:', todayStr);
    }

    // console.log('Dates finales dans orderDates:', Array.from(this.orderDates));
  }

  private initializeDates() {
    this.selectedDate = this.selectedDate;
    this.updateCurrentDate(this.selectedDate);

    // Créer un tableau de toutes les dates uniques avec des commandes
    const allDates = Array.from(this.orderDates)
      .map(dateStr => {
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(Date.UTC(year, month - 1, day));
      })
      .sort((a, b) => a.getTime() - b.getTime());

    // Si pas de dates de commandes, on ajoute aujourd'hui par défaut
    if (allDates.length === 0) {
      allDates.push(new Date());
    }

    // Mapper au format attendu
    this.nextDays = allDates.map(date => ({
      day: this.formatDayName(date),
      date: date.getUTCDate(),
      fullDate: date,
    }));

    // console.log(
    //   'Dates des commandes:',
    //   this.nextDays.map(d => ({
    //     day: d.day,
    //     date: d.date,
    //     fullDate: d.fullDate.toISOString(),
    //   }))
    // );
  }

  // Formater le nom du jour en français avec majuscule
  private formatDayName(date: Date): string {
    const dayName = date.toLocaleDateString('fr-FR', { weekday: 'short' });
    return dayName.charAt(0).toUpperCase() + dayName.slice(1);
  }

  isToday(date: Date): boolean {
    const today = new Date();
    const checkDate = new Date(date);
    return checkDate.getUTCDate() === today.getUTCDate() && checkDate.getUTCMonth() === today.getUTCMonth() && checkDate.getUTCFullYear() === today.getUTCFullYear();
  }

  private updateCurrentDate(date: Date) {
    this.currentDate = date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  selectDay(day: { fullDate: Date }) {
    this.selectedDate = new Date(day.fullDate);
    this.updateCurrentDate(day.fullDate);
    this.handleStoreOrder(day.fullDate, this.ffOrder);
  }
}
