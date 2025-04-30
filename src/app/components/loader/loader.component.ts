import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  @Input() load: boolean = false;
  @Input() height: string = '100%';
  @Input() strokeWidth = 5;
  @Input() fillColor = 'rgb(255, 0, 0)';
  @Input() stokeColor = 'none';

  constructor() {}

  ngOnInit() {}
}
