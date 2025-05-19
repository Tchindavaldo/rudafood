import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-component2',
  templateUrl: './component2.component.html',
  styleUrls: ['./component2.component.scss'],
})
export class Component2Component implements OnInit {
  constructor() {}
  @Input() shadow = '';
  @Input() backgrd = '';
  @Input() mLeft = '';
  @Input() color1 = '';
  @Input() color2 = '';
  @Input() text1 = 'LUN';
  @Input() text2 = '12';
  @Input() icon = ''; // Pour afficher une icône au lieu du texte
  ngOnInit() {}
}
