import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { updateOrdersRequetService } from 'src/services/FastFood/requet/update-orders-requet.service';
import { showCard } from 'src/utils/showCard';

enum RefundStep {
  CONFIRM_REFUND = 0,
  SHOW_AMOUNT = 1,
  ENTER_PHONE = 2,
  VALIDATION_INSTRUCTIONS = 3,
  COMPLETED = 4,
}

interface PaymentData {
  total: number;
  feePercentage?: number;
  cashoutPercentage?: number;
  extras?: any[];
}

@Component({
  selector: 'app-payment-pending-order',
  templateUrl: './payment-pending-order.component.html',
  styleUrls: ['./payment-pending-order.component.scss'],
})
export class PaymentPendingOrderComponent implements OnChanges {
  iconBtn1 = 'wallet-outline';
  titleColor = 'danger';
  confirmationColor = 'rgba(236,73,19,1.00)';
  titleAction = 'Voulez vous vraiment Annuler ?';
  textConfirmation = 'payer';

  // Étape actuelle du processus de remboursement
  currentStep: RefundStep = RefundStep.CONFIRM_REFUND;

  // Propriétés pour le remboursement
  refundAmount: number = 0;
  feePercentage: number = 2;
  cashoutPercentage: number = 2;
  feeAmount: number = 0;
  finalRefundAmount: number = 0;
  phoneNumber: string = '';

  @Input() translateY = 0;
  @Input() id!: string;
  @Input() data!: PaymentData; // Le parent doit fournir cette donnée
  @Output() outputConfirmBtnClick = new EventEmitter<any>();
  @Output() outputBtn2Click = new EventEmitter<any>();

  @Input() modalId: string = '1';
  @Input() showLoader = false;
  @Output() closeModal = new EventEmitter<any>();
  @Output() confirmBtnClick = new EventEmitter<any>();

  // Hauteur de base du modal
  baseHeight = 160;
  // Hauteur calculée du modal
  modalHeight = this.baseHeight;
  // Hauteur par ligne d'extras (pour chaque groupe de 4 extras)
  extraRowHeight = 40;

  /**
   * Calcule la hauteur du modal en fonction du nombre d'extras
   */
  // calculateModalHeight() {
  //   if (this.data && this.data.extras && this.data.extras.length > 0) {
  //     // Calculer combien de lignes d'extras seront nécessaires (4 extras par ligne)
  //     const numberOfExtras = this.data.extras.length;
  //     const numberOfRows = Math.ceil(numberOfExtras / 4);

  //     // Calculer la hauteur totale (hauteur de base + hauteur supplémentaire pour chaque ligne)
  //     this.modalHeight = this.baseHeight + (numberOfRows - 1) * this.extraRowHeight;
  //   } else {
  //     // Si pas d'extras, utiliser la hauteur de base
  //     this.modalHeight = this.baseHeight;
  //   }
  // }

  emitCloseModl() {
    this.closeModal.emit({ height: this.modalHeight });
    this.closeCard();
  }

  closeCard() {
    showCard(this.modalId, 'y', '-85px', 1000);
  }

  isUpdating = false;

  constructor(private updateOrdersRequet: updateOrdersRequetService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data) {
      // Calculer le montant du remboursement à partir des données de la commande
      this.calculateRefundAmount();
    }

    if (changes['showLoader']) {
      // console.log('showLoader changed to:', this.showLoader);
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
    this.iconBtn1 = 'wallet-outline';
  }

  async processRefund() {
    try {
      // Afficher d'abord les instructions de validation
      this.currentStep = RefundStep.VALIDATION_INSTRUCTIONS;
      this.titleAction = 'Veuillez composer le #150# et entrer votre code secret pour valider la transaction';
      this.titleColor = 'warning';

      // Après un délai, passer à l'étape de succès
      setTimeout(() => {
        // Logique de remboursement via Orange Money
        if (this.data) {
          // Passer à l'étape terminée
          this.currentStep = RefundStep.COMPLETED;
          this.titleAction = 'Remboursement effectué';
          this.textConfirmation = 'Terminé';
          this.iconBtn1 = 'wallet-outline';
          this.titleColor = 'success';
        }

        // Fermer automatiquement après 3 secondes
        setTimeout(() => {
          this.outputConfirmBtnClick.emit();
          setTimeout(() => {
            this.resetToInitialState();
          }, 1000);
        }, 3000);
      }, 2000);
    } catch (error) {
      console.log('error', error);
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
    this.textConfirmation = '  Payer  ';
    this.iconBtn1 = 'wallet-outline';
    this.titleColor = 'danger';
  }

  onInputFocus(event: any) {
    this.translateY = -150; // Ajustez cette valeur selon vos besoins
    // Empêcher le comportement par défaut
    event.stopPropagation();
    event.preventDefault();
  }

  onInputBlur() {
    this.translateY = 0;
  }

  // Fonction pour calculer les montants
  calculateAmounts() {
    if (!this.data) return { withdrawalFee: 0, transactionFee: 0, totalAmount: 0 };

    const withdrawalFee = (this.data.total * this.cashoutPercentage) / 100;
    const transactionFee = (this.data.total * this.feePercentage) / 100;
    const totalAmount = this.data.total + withdrawalFee + transactionFee;

    return {
      withdrawalFee: Math.round(withdrawalFee),
      transactionFee: Math.round(transactionFee),
      totalAmount: Math.round(totalAmount),
    };
  }

  // Méthode pour revenir à l'étape précédente
  goToPreviousStep() {
    if (this.currentStep > RefundStep.CONFIRM_REFUND) {
      this.currentStep--;
      this.updateStepUI();
    }
  }

  updateStepUI() {
    switch (this.currentStep) {
      case RefundStep.CONFIRM_REFUND:
        this.titleAction = 'Voulez vous vraiment Annuler ?';
        this.textConfirmation = '  Payer  ';
        this.iconBtn1 = 'wallet-outline';
        this.titleColor = 'danger';
        break;
      case RefundStep.SHOW_AMOUNT:
        this.titleAction = '';
        this.textConfirmation = 'Suivant';
        this.iconBtn1 = 'arrow-forward-outline';
        break;
      case RefundStep.ENTER_PHONE:
        this.titleAction = 'Numéro Orange Money';
        this.textConfirmation = 'Payer';
        this.iconBtn1 = 'wallet-outline';
        break;
      default:
        break;
    }
  }
}
