import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { showCard } from 'src/utils/showCard';

@Component({
  selector: 'app-order-modal-item1',
  templateUrl: './order-modal-item1.component.html',
  styleUrls: ['./order-modal-item1.component.scss'],
})
export class OrderModalItem1Component implements OnInit, OnChanges {
  iconBtn1 = 'trash-outline';
  titleColor = 'danger';
  confirmationColor = 'darkRed';
  titleAction = 'Voulez vous vraiment supprimer ?';

  @Input() id!: string;
  @Input() data?: any;
  @Output() outputConfirmBtnClick = new EventEmitter<any>();
  @Output() outputBtn2Click = new EventEmitter<any>();
  textConfirmation: string = '';

  constructor() {}

  ngOnInit() {
    this.updateTextConfirmation();
  }

  updateTextConfirmation() {
    if (this.id === 'bottom-card-dispoMenu' && this.data && this.data.status !== undefined) {
      this.textConfirmation = 'confirmer';
      console.log('status recu ', this.data.status);
      this.confirmationColor = this.data.status === 'available' ? 'forestgreen' : 'darkRed';
      const statusText = this.data.status === 'available' ? 'Disponible' : 'Indisponible';
      const statusColor = this.data.status === 'available' ? 'success' : 'danger';
      this.titleAction = `Voulez vous rendre ${statusText} ?`;
      this.titleColor = statusColor;
      this.iconBtn1 = 'checkmark-outline';
    } else if (this.id === 'bottom-card-delteMenu') {
      this.textConfirmation = 'Supprimer';
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      // console.log('data recu ', this.data);
      // Only call updateTextConfirmation if data exists
      if (this.data) {
        this.updateTextConfirmation();
      }
    }
  }

  emitConfirmBtnClick() {
    this.outputConfirmBtnClick.emit();
  }

  emitBtn2Click() {
    this.outputBtn2Click.emit();
  }

  closeCard() {
    showCard(this.id, 'y', '140px', 1000);
  }
}
