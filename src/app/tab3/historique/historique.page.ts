import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.page.html',
  styleUrls: ['./historique.page.scss'],
})
export class HistoriquePage implements OnInit {
  totalAmountAccount = 0;
  totalAmountSpend = 0;
  constructor(private router: Router) {}

  ngOnInit() {}

  redirect(path: string) {
    this.router.navigate([path]);
  }

  showBack() {
    const el = document.getElementById('backToShow');

    if (el != null) {
      el.style.transform = 'scale(1)';
    }
  }
}
