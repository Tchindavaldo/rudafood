import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() outputCloseOrder = new EventEmitter<any>();
  @Input() postOrder!: (status: any) => void;
  constructor() {}

  ngOnInit() {}

  emitCloseOrder() {
    this.outputCloseOrder.emit();
  }
}
