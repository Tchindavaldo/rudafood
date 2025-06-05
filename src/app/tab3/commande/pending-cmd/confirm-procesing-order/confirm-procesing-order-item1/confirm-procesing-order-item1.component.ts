import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { updateOrdersRequetService } from 'src/services/FastFood/requet/update-orders-requet.service';
import { showCard } from 'src/utils/showCard';

enum RefundStep {
  CONFIRM_REFUND = 0,
  SHOW_AMOUNT = 1,
  ENTER_PHONE = 2,
  VALIDATION_INSTRUCTIONS = 3,
  COMPLETED = 4,
}

@Component({
  selector: 'app-confirm-procesing-order-item1',
  templateUrl: './confirm-procesing-order-item1.component.html',
  styleUrls: ['./confirm-procesing-order-item1.component.scss'],
})
export class ConfirmProcesingOrderItem1Component implements OnChanges {
  iconBtn1 = 'checkmark-outline';
  titleColor = 'danger';
  confirmationColor = 'darkRed';
  titleAction = 'Voulez vous vraiment Annuler ?';
  textConfirmation = '  OUI  ';

  // Étape actuelle du processus de remboursement
  currentStep: RefundStep = RefundStep.CONFIRM_REFUND;

  // Propriétés pour le remboursement
  refundAmount: number = 0;
  feePercentage: number = 25;
  feeAmount: number = 0;
  finalRefundAmount: number = 0;
  phoneNumber: string = '';

  @Input() id!: string;
  @Input() data?: any;
  @Output() outputConfirmBtnClick = new EventEmitter<any>();
  @Output() outputBtn2Click = new EventEmitter<any>();

  isUpdating = false;

  constructor(private updateOrdersRequet: updateOrdersRequetService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data) {
      // Calculer le montant du remboursement à partir des données de la commande
      this.calculateRefundAmount();
    }
  }

  calculateRefundAmount() {
    if (this.data) {
      this.refundAmount = this.data.total;
      this.feeAmount = this.refundAmount * (this.feePercentage / 100);
      this.finalRefundAmount = this.refundAmount + this.feeAmount;
    }
  }

  async emitConfirmBtnClick() {
    // Logique différente selon l'étape actuelle
    switch (this.currentStep) {
      case RefundStep.CONFIRM_REFUND:
        // Passer à l'étape d'affichage du montant
        this.moveToAmountStep();
        break;
      case RefundStep.SHOW_AMOUNT:
        // Passer à l'étape de saisie du numéro de téléphone
        this.moveToPhoneStep();
        break;
      case RefundStep.ENTER_PHONE:
        // Effectuer le paiement
        await this.processRefund();
        break;
      default:
        break;
    }
  }

  moveToAmountStep() {
    this.currentStep = RefundStep.SHOW_AMOUNT;
    // Le texte est maintenant directement dans le template HTML avec <br>
    this.textConfirmation = 'Suivant';
    this.iconBtn1 = 'arrow-forward-outline';
  }

  moveToPhoneStep() {
    this.currentStep = RefundStep.ENTER_PHONE;
    this.titleAction = 'Numéro Orange Money';
    this.textConfirmation = 'Payer';
    this.iconBtn1 = 'cash-outline';
  }

  async processRefund() {
    try {
      this.isUpdating = true;

      // Afficher d'abord les instructions de validation
      this.currentStep = RefundStep.VALIDATION_INSTRUCTIONS;
      this.titleAction = 'Veuillez composer le #150# et entrer votre code secret pour valider la transaction';
      this.titleColor = 'warning';
      this.isUpdating = false;

      // Après un délai, passer à l'étape de succès
      setTimeout(() => {
        // Logique de remboursement via Orange Money
        if (this.data) {
          // Passer à l'étape terminée
          this.currentStep = RefundStep.COMPLETED;
          this.titleAction = 'Remboursement effectué';
          this.textConfirmation = 'Terminé';
          this.iconBtn1 = 'checkmark-done-outline';
          this.titleColor = 'success';
        }

        // Fermer automatiquement après 3 secondes
        setTimeout(() => {
          this.outputConfirmBtnClick.emit();
          setTimeout(() => {
            this.resetToInitialState();
          }, 1000);
        }, 3000);
      }, 5000);
    } catch (error) {
      console.log('error', error);
      this.isUpdating = false;
    }
  }

  updatePhoneNumber(event: any) {
    this.phoneNumber = event.target.value;
  }

  emitBtn2Click() {
    this.outputBtn2Click.emit();
    setTimeout(() => {
      this.resetToInitialState();
    }, 1000);
  }

  resetToInitialState() {
    this.currentStep = RefundStep.CONFIRM_REFUND;
    this.titleAction = 'Voulez vous vraiment Annuler ?';
    this.textConfirmation = '  OUI  ';
    this.iconBtn1 = 'checkmark-outline';
    this.titleColor = 'danger';
  }
}
