import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-modal-item3',
  templateUrl: './order-modal-item3.component.html',
  styleUrls: ['./order-modal-item3.component.scss'],
})
export class OrderModalItem3Component implements OnInit {
  @Input() titre = 'Mayonaise';
  constructor() {}

  ngOnInit() {}
}
