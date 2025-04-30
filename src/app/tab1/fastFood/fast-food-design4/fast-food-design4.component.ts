import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fast-food-design4',
  templateUrl: './fast-food-design4.component.html',
  styleUrls: ['./fast-food-design4.component.scss'],
})
export class FastFoodDesign4Component implements OnInit {
  @Input() fastFood: any;
  @Input() handleMenuClick!: (menu: any) => any;

  constructor() {}

  ngOnInit() {}
}
