import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-marchand-header',
  templateUrl: './marchand-header.component.html',
  styleUrls: ['./marchand-header.component.scss'],
})
export class MarchandHeaderComponent implements OnInit {
  @Input() name = 'no name';

  constructor() {}
  collection = [3, 3, 2];
  ngOnInit() {}
}
