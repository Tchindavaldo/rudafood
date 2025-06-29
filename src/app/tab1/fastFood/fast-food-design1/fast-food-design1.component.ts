import { Component, Input, OnInit } from '@angular/core';
import { showBottomCard } from '../utils';

@Component({
  selector: 'app-fast-food-design1',
  templateUrl: './fast-food-design1.component.html',
  styleUrls: ['./fast-food-design1.component.scss'],
})
export class FastFoodDesign1Component implements OnInit {
  @Input() fastFood: any;
  @Input() handleMenuClick!: (menu: any) => any;
  showBottomCard!: any;

  constructor() {}

  ngOnInit() {
    this.showBottomCard = showBottomCard;
  }
}
