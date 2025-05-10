import { Component, OnInit } from '@angular/core';
import { bonusDataService } from 'src/app/services/bonus/data/bonus-data.service';
import { getBonusService } from 'src/app/services/bonus/get-bonus.service';
import { OrderDataService } from 'src/app/services/orders/data/order-data.service';
import { getUserOrdersService } from 'src/app/services/orders/get/get-user-orders.service';

@Component({
  selector: 'app-bonus-order-buyed',
  templateUrl: './bonus-order-buyed.component.html',
  styleUrls: ['./bonus-order-buyed.component.scss'],
})
export class BonusOrderBuyedComponent implements OnInit {
  isloading = false;
  erroDataGeting = false;
  constructor(public bonusData: bonusDataService, private bonusRequet: getBonusService, public orderData: OrderDataService, private getUserOrdersService: getUserOrdersService) {}

  ngOnInit(): void {
    // this.setKey();
    // this.fetchBonus();
    // this.photo = this.userStorage.get('photoUrl');
  }

  // async fetchBonus() {
  //   try {
  //     this.isloading = true;
  //     if (this.bonusData.getbonus() === null) await this.bonusRequet.getBonus();
  //     if (this.orderData.getUserOrders() === null) await this.getUserOrdersService.getFastUserOrders();

  //     this.isloading = false;
  //   } catch (error) {
  //     console.log(error);
  //     this.isloading = false;
  //     this.erroDataGeting = true;
  //   }
  // }
}
