import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { showCard } from 'src/utils/showCard';

@Component({
  selector: 'app-modal-item1',
  templateUrl: './modal-item1.component.html',
  styleUrls: ['./modal-item1.component.scss'],
})
export class ModalItem1Component implements OnInit {
  iconBtn1 = 'trash-outline';

  @Input() id!: string;
  @Output() outputBtn1Click = new EventEmitter<any>();
  @Output() outputBtn2Click = new EventEmitter<any>();
  textConfirmation: string = '';

  constructor() {}

  ngOnInit() {
    this.updateTextConfirmation();
  }

  updateTextConfirmation() {
    if (this.id === 'bottom-card-dispoMenu') {
      this.textConfirmation = 'Changer';
      this.iconBtn1 = 'checkmark-outline';
    } else if (this.id === 'bottom-card-delteMenu') {
      this.textConfirmation = 'Supprimer';
    }
  }

  emitBtn1Click() {
    this.outputBtn1Click.emit();
  }

  emitBtn2Click() {
    this.outputBtn2Click.emit();
  }

  closeCard() {
    showCard(this.id, 'y', '95px', 1000);
  }
}
