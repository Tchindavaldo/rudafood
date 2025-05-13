import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/indx';
import { group, style, transition, trigger, query, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { userOrderRouteAnimation } from 'src/app/animations/user-order-route-animations';
import { userOrderRouteNoAnimation } from 'src/app/animations/user-order-route-noAnimations copy';
import { getUserOrdersService } from 'src/services/orders/get/get-user-orders.service';
import { OrderDataService } from 'src/services/orders/data/order-data.service';

@Component({
  selector: 'app-manage-passed-order-status',
  templateUrl: './manage-passed-order-status.page.html',
  styleUrls: ['./manage-passed-order-status.page.scss'],
  animations: [userOrderRouteAnimation],
})
export class ManagePassedOrderStatusPage implements OnInit {
  showAnim = false;
  userOrder!: Observable<any[]>;
  constructor(private router: Router, public orderData: OrderDataService, private getUserOrdersService: getUserOrdersService) {}

  ngOnInit() {
    this.fetchData();
  }

  getAnimationData(outlet: any): string {
    const animationKey = outlet?.activatedRouteData?.animation;
    console.log('Animation Data:', animationKey);
    return animationKey;
  }

  async fetchData() {
    try {
      if (this.orderData.getUserOrders() === null) await this.getUserOrdersService.getFastUserOrders();
      this.router.navigate(['tabs/tab2/status-order/user-pending-order-NoAnim']);
      // console.log('order  data', this.orderData.getUserOrders());
    } catch (error) {
      console.error('Erreur', error);
    }
  }
}
