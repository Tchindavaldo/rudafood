import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custum-ckeckbox',
  templateUrl: './custum-ckeckbox.component.html',
  styleUrls: ['./custum-ckeckbox.component.scss'],
})
export class CustumCkeckboxComponent implements OnInit {
  @Input() titre = '';
  @Input() size = '18px';
  @Input() borderRadius = '6px';

  constructor() {}

  ngOnInit() {}
}
