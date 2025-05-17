import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-porte-feuil-historique',
  templateUrl: './porte-feuil-historique.page.html',
  styleUrls: ['./porte-feuil-historique.page.scss'],
})
export class PorteFeuilHistoriquePage implements OnInit {
  @Input() transaction!: any;
  constructor() {}

  ngOnInit() {}
}
