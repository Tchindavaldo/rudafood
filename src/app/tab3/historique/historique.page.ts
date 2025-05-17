import { Component, Input, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { IonCol } from '@ionic/angular';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable, take } from 'rxjs';
import { getTransactionService } from 'src/services/transaction/request/get-transaction.service';
import { AppState } from 'src/store/indx';
import { ToastService } from 'src/services/toast/toast.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.page.html',
  styleUrls: ['./historique.page.scss'],
})
export class HistoriquePage implements OnInit {
  @ViewChild('depotSegment') depotSegment!: ElementRef;
  @ViewChild('retraitSegment') retraitSegment!: ElementRef;
  @ViewChild('transfertSegment') transfertSegment!: ElementRef;

  totalAmountAccount = 0;
  totalAmountSpend = 0;

  private calculateTotalAmounts(transactions: any[]) {
    if (!transactions) return;

    this.totalAmountAccount = 0;
    this.totalAmountSpend = 0;

    transactions.forEach(transaction => {
      if (transaction.amount) this.totalAmountSpend += transaction.amount;
    });
  }
  isLoading = false;
  erroDataGeting = false;
  transaction!: Observable<any[]>;
  currentPage = 1;
  pageSize = 5;
  hasMoreTransactions = true;

  constructor(private router: Router, private store: Store<AppState>, private transactionService: getTransactionService, private toastService: ToastService, private renderer: Renderer2) {
    // Initialize base styles for all segments
    setTimeout(() => {
      const segments = document.querySelectorAll('.col-segment');
      segments.forEach(segment => {
        this.renderer.setStyle(segment, 'transform', 'scale(1)');
      });
    }, 0);
  }

  ngOnInit() {
    this.fetchNotification();
  }

  redirect(path: string) {
    this.router.navigate([path]);
  }

  trackByTransactionId(id: any, item: any) {
    return item.id;
  }

  async fetchNotification() {
    try {
      this.transaction = this.store.select(state => state.transaction.Transaction);
      this.transaction.subscribe(transactions => this.calculateTotalAmounts(transactions));

      if ((await firstValueFrom(this.transaction)) !== null) return;
      console.log('fetching data apppeler');
      this.isLoading = true;
      await this.transactionService.getTransaction();

      this.isLoading = false;
    } catch (error) {
      console.log(error);
      this.isLoading = false;
      this.erroDataGeting = true;
    }
  }

  showToast(message: string, position: 'top' | 'middle' | 'bottom') {
    this.toastService.presentToast(position, `Fonctionnalité ${message} à venir dans les mises à jour`);
  }

  onTouchStart(segmentId: string) {
    const segment = document.querySelector(`#${segmentId}`);
    if (segment) {
      this.renderer.setStyle(segment, 'transform', 'scale(1.2)');
      setTimeout(() => {
        this.renderer.setStyle(segment, 'transform', 'scale(1)');
      }, 200);
    } else {
      console.log('segment not found');
    }
  }

  async loadMoreTransactions(event: any) {
    try {
      this.currentPage++;

      // Set loading state
      this.isLoading = true;

      // Fetch more transactions
      await this.transactionService.getTransaction();

      // Get the current transactions from store
      const currentTransactions = await this.store
        .select(state => state.transaction.Transaction)
        .pipe(take(1))
        .toPromise();

      // Check if we have reached the end
      if (!currentTransactions || currentTransactions.length < this.pageSize) {
        this.hasMoreTransactions = false;
      }

      event.target.complete();
      this.isLoading = false;
    } catch (error) {
      console.error('Error loading more transactions:', error);
      event.target.complete();
    }
  }
}
