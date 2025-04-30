import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fastFoodOrderRouteAnimation } from 'src/app/animations/fastfood-order-route-animations';
import { OrderDataService } from 'src/app/services/orders/data/order-data.service';
import { getOrdersService } from 'src/app/services/orders/get/get-orders.service';
import { AppState } from 'src/app/store/indx';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.page.html',
  styleUrls: ['./commande.page.scss'],
  animations: [fastFoodOrderRouteAnimation],
})
export class CommandePage implements OnInit {
  userData: any;
  fastFoodOrder!: Observable<any[]>; // Utilisation d'un Observable
  private ffOrder!: any[];

  constructor(private router: Router, private getOrdersService: getOrdersService, public orderData: OrderDataService, private store: Store<AppState>) {}

  ngOnInit() {
    const height = window.innerHeight;
    // if (height < 650) {
    //   this.marginGrid = '0 0 25px 0';
    // }

    console.log('etat', this.orderData.getFastfoodOrders());

    if (this.orderData.getFastfoodOrders() !== null) {
      this.router.navigate(['tabs/tab3/commande/pending-noAnim']);
    } else {
      this.fetchFastFoodOrders();
    }
  }

  async fetchFastFoodOrders() {
    try {
      await this.getOrdersService.getFastFoodOrders();
      this.router.navigate(['tabs/tab3/commande/pending-noAnim']);
      // console.log('order pending data', order);
    } catch (error) {
      console.error('Erreur', error);
    }
  }
  getAnimationData(outlet: any): string {
    const animationKey = outlet?.activatedRouteData?.animation;
    console.log('Animation Data:', animationKey); // Ajoute un log pour voir la clé d'animation
    return animationKey;
  }
}
