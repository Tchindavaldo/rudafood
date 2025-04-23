import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filterByArg } from 'src/app/services/functions/tabs/filterByArg';
import { getOrdersService } from 'src/app/services/orders/get-orders.service';
import { OrderDataService } from 'src/app/services/orders/order-data.service';
@Component({
  selector: 'app-proccess-cmd',
  templateUrl: './proccess-cmd.component.html',
  styleUrls: ['./proccess-cmd.component.scss'],
})
export class ProccessCmdComponent implements OnInit {
  proccessOrder = undefined;

  constructor(private router: Router, private ordersService: OrderDataService) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state) {
      this.proccessOrder = nav.extras.state['fastFoodOrder'];
      console.log('commande get from proccess page', filterByArg(this.proccessOrder, 'status', 'processing'));
    }
  }
  ngOnInit() {}

  addTestOrder() {
    const testOrder = {
      id: 'YMxtfwg8Nn01o3u8Hogg',
      clientName: 'Alice',
      items: [
        {
          name: 'Burger',
          quantity: 2,
        },
      ],
      total: 20,
      createdAt: {
        _seconds: 1745246909,
        _nanoseconds: 47000000,
      },
      status: 'processing',
    };

    this.ordersService.addOrderTabs(testOrder);
    console.log('general order', this.ordersService.getOrderTabs());
    console.log('local order', filterByArg(this.proccessOrder, 'status', 'processing'));
  }
}
