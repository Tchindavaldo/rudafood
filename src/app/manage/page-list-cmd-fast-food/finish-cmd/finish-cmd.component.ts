import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filterByArg } from 'src/app/services/functions/tabs/filterByArg';
@Component({
  selector: 'app-finish-cmd',
  templateUrl: './finish-cmd.component.html',
  styleUrls: ['./finish-cmd.component.scss'],
})
export class FinishCmdComponent implements OnInit {
  finishOrder = undefined;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state) {
      this.finishOrder = nav.extras.state['fastFoodOrder'];
      console.log('commande get from finish page', filterByArg(this.finishOrder, 'status', 'finished'));
    }
  }
  ngOnInit() {}
}
