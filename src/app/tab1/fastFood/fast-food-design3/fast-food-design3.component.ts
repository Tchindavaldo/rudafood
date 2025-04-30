import { Component, Input, OnInit } from '@angular/core';
import { showBottomCard } from '../utils';

@Component({
  selector: 'app-fast-food-design3',
  templateUrl: './fast-food-design3.component.html',
  styleUrls: ['./fast-food-design3.component.scss'],
})
export class FastFoodDesign3Component implements OnInit {
  @Input() fastFood: any;
  @Input() handleMenuClick!: (menu: any) => any;
  showBottomCard!: any;

  constructor() {}

  ngOnInit() {
    this.showBottomCard = showBottomCard;
    // console.log('fastFood', this.fastFood);
  }
}
