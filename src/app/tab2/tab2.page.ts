import { AfterContentChecked, AfterViewChecked, Component, OnInit } from '@angular/core';
import { Commande } from '../data/commande';
import { DataService } from '../services/data.service';
import { requeToFastFood } from '../services/requeToFastFood';
import { requeToUser } from '../services/requeToUser';
import { FastFood } from '../data/fastFood';
import { Users } from '../data/Users';
import { showLoaderToast } from '../services/showLoaderToast';
import { userOrderRouteAnimation } from '../animations/user-order-route-animations';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  animations: [userOrderRouteAnimation],
})
export class Tab2Page implements OnInit {
  constructor() {}
  ngOnInit(): void {
    // this.loadData()
    // this.loadData2()
  }
}
