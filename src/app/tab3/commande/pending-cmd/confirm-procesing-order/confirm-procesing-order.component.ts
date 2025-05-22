import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { showCard } from 'src/utils/showCard';

@Component({
  selector: 'app-confirm-procesing-order',
  templateUrl: './confirm-procesing-order.component.html',
  styleUrls: ['./confirm-procesing-order.component.scss'],
})
export class ConfirmProcesingOrderComponent implements OnChanges {
  @Input() modalId!: string;
  @Input() data?: any;
  @Input() showLoader = false;
  @Output() closeModal = new EventEmitter<any>();
  @Output() confirmBtnClick = new EventEmitter<any>();

  // Hauteur de base du modal
  baseHeight = 160;
  // Hauteur calculée du modal
  modalHeight = this.baseHeight;
  // Hauteur par ligne d'extras (pour chaque groupe de 4 extras)
  extraRowHeight = 40;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data) {
      // Calculer la hauteur du modal en fonction du nombre d'extras
      this.calculateModalHeight();
    }
    if (changes['showLoader']) {
      // console.log('showLoader changed to:', this.showLoader);
    }
  }

  /**
   * Calcule la hauteur du modal en fonction du nombre d'extras
   */
  calculateModalHeight() {
    if (this.data && this.data.extras && this.data.extras.length > 0) {
      // Calculer combien de lignes d'extras seront nécessaires (4 extras par ligne)
      const numberOfExtras = this.data.extras.length;
      const numberOfRows = Math.ceil(numberOfExtras / 4);

      // Calculer la hauteur totale (hauteur de base + hauteur supplémentaire pour chaque ligne)
      this.modalHeight = this.baseHeight + (numberOfRows - 1) * this.extraRowHeight;
    } else {
      // Si pas d'extras, utiliser la hauteur de base
      this.modalHeight = this.baseHeight;
    }
  }

  emitCloseModl() {
    this.closeModal.emit({ height: this.modalHeight });
    this.closeCard();
  }

  closeCard() {
    showCard(this.modalId, 'y', '-85px', 1000);
  }

  emitConfirmBtnClick() {
    this.closeCard();
  }
}
