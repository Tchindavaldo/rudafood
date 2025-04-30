import { Component, Input, OnInit } from '@angular/core';
import { showBottomCard } from '../utils';

@Component({
  selector: 'app-fast-food-design2',
  templateUrl: './fast-food-design2.component.html',
  styleUrls: ['./fast-food-design2.component.scss'],
})
export class FastFoodDesign2Component implements OnInit {
  @Input() fastFood: any;
  @Input() handleMenuClick!: (menu: any) => any;
  showBottomCard!: any;

  constructor() {}

  ngOnInit() {
    this.showBottomCard = showBottomCard;
    // console.log('fastFood', this.fastFood);
  }
}
