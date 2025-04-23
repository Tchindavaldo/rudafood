import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filterByArg } from 'src/app/services/functions/tabs/filterByArg';
@Component({
  selector: 'app-pending-cmd',
  templateUrl: './pending-cmd.component.html',
  styleUrls: ['./pending-cmd.component.scss'],
})
export class PendingCmdComponent implements OnInit {
  pendingCmd = undefined;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state) {
      this.pendingCmd = nav.extras.state['fastFoodOrder'];
      console.log('commande get from pending page', filterByArg(this.pendingCmd, 'status', 'pending'));
    }
  }

  ngOnInit() {}
}
