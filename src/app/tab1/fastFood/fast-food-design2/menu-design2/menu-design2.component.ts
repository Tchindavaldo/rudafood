import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-design2',
  templateUrl: './menu-design2.component.html',
  styleUrls: ['./menu-design2.component.scss'],
})
export class MenuDesign2Component implements OnInit {
  @Input() menu!: any;
  constructor() {}

  ngOnInit() {}
}
