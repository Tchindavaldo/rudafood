import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.scss'],
})
export class Component1Component implements OnInit {
  constructor() {}
  @Input() text1 = '12';
  @Input() text2 = 'cmd';
  @Input() text3 = 'Commande Effectuer';
  @Input() text2Color = '';
  ngOnInit() {}
}
