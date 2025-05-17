import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-item-list',
  templateUrl: './menu-item-list.component.html',
  styleUrls: ['./menu-item-list.component.scss'],
})
export class MenuItemListComponent implements OnInit {
  @Output() openModal = new EventEmitter<void>();
  @Input() idDialog!: string;
  @Input() menu!: any;
  @Input() nbr = '1';
  @Input() paddingText7 = '';
  @Input() colorText8 = 'darkgreen';
  @Input() text8 = 'Disponible';
  @Input() text9 = 'Indisponible';
  @Input() iconName = '';
  @Input() showCheck = false;
  @Input() showOrderNbr = true;
  @Input() orderNbr = '50';
  @Input() totalOrder = '50';
  constructor() {}

  ngOnInit() {}

  triggerModal() {
    this.openModal.emit(); // 🔁 Informe le parent d’ouvrir le modal
  }
}
