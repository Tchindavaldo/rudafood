import { AfterContentChecked, AfterViewChecked, Component, OnInit } from '@angular/core';
import { Commande } from '../data/cmd';
import { DataService } from '../../services/data.service';
import { requeToFastFood } from '../../services/requeToFastFood';
import { requeToUser } from '../../services/requeToUser';
import { FastFood } from '../data/fastFood';
import { Users } from '../data/Users';
import { showLoaderToast } from '../../services/showLoaderToast';
import { userOrderRouteAnimation } from '../animations/user-order-route-animations';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  animations: [userOrderRouteAnimation],
})
export class Tab2Page {
  currentUrl: string = '';
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
      }
    });
  }

  shouldHideElement(): boolean {
    return this.currentUrl.includes('bonus');
  }
}
