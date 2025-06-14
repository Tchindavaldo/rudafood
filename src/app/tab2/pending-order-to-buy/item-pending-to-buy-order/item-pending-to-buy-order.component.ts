import { Component, Input, OnInit } from '@angular/core';
import { CardService } from 'src/services/card.service';
@Component({
  selector: 'app-item-pending-to-buy-order',
  templateUrl: './item-pending-to-buy-order.component.html',
  styleUrls: ['./item-pending-to-buy-order.component.scss'],
})
export class ItemPendingToBuyOrderComponent {
  constructor(private cardControl: CardService) {
    console.log('item pending to buy order', this.cmdGet);
  }
  @Input() widthCard = '';
  @Input() heightCard = '';
  @Input() marginLeftCard = '';

  @Input() backgroundItem = '';
  @Input() paddingTopItem = '';

  @Input() text1Ligne1? = 'Pain amelettes';
  @Input() colorText1Ligne1? = '';

  @Input() text1Ligne2? = 'Modifier';
  @Input() showText1Ligne2? = true;

  @Input() text2Ligne2?: String;
  @Input() showText2Ligne2? = true;

  @Input() text1Ligne3? = '500f';
  @Input() colorText1Ligne3? = '';

  @Input() textIonChip? = '1';
  @Input() colorIonChip? = 'danger';
  @Input() colorIonChip2? = '';
  @Input() backgoundColorIonChip2? = '';
  @Input() showIcon? = true;
  @Input() idxCmd!: number;
  @Input() cmdGet!: any;

  // @Input()userCmd2! : Commande
  userCmd!: any;

  async deleteCmd() {}

  public showBottomCard() {
    this.cardControl.bottomCardIsShow = false;
    this.cardControl.idxCmdToModify = this.idxCmd;
    this.cardControl.showBottomCard('bottom-card-cmd');
    console.log('cmd a modifier ', this.idxCmd);
  }
}
