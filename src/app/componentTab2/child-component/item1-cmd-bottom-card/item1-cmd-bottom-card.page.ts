import { Component, OnInit, Input } from '@angular/core';
import { CardService } from 'src/services/card.service';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-item1-cmd-bottom-card',
  templateUrl: './item1-cmd-bottom-card.page.html',
  styleUrls: ['./item1-cmd-bottom-card.page.scss'],
})
export class Item1CmdBottomCardPage implements OnInit {
  @Input() widthCard = '';
  @Input() heightCard = '';
  @Input() marginLeftCard = '';

  @Input() backgroundItem = '';
  @Input() paddingTopItem = '';

  @Input() text1Ligne1 = 'Pain amelettes';
  @Input() colorText1Ligne1? = '';

  @Input() text1Ligne2? = 'Modifier';
  @Input() showText1Ligne2? = true;

  @Input() text2Ligne2?: String;
  @Input() showText2Ligne2? = true;

  @Input() text1Ligne3: number | string = 500;
  @Input() colorText1Ligne3? = '';

  @Input() textIonChip? = '1';
  @Input() colorIonChip? = 'danger';
  @Input() colorIonChip2? = '';
  @Input() backgoundColorIonChip2? = '';
  @Input() boxShadow? = '';
  @Input() leftChip? = '';
  @Input() righttChip2? = '';
  @Input() showIcon? = true;
  @Input() showIconCart? = false;
  @Input() showIBtnBuy? = false;
  @Input() showIconCancel? = false;

  constructor(private cardControle: CardService, private dataService: DataService) {}
  ngOnInit() {}

  public hideBottomCard() {
    this.cardControle.hideBottomCard1('bottom-card-cmd');

    // this.cardIsShow=this.cardControle.bottomCardIsShow
    console.log('click to hode');
  }

  actionToCmd(action: string) {
    if (action == 'buy') {
      this.cardControle.cmd.isBuy = true;
      this.cardControle.cmd.ispending = false;
      // this.dataService.user.cmd.push(this.cardControle.cmd)
    }
    if (action == 'pannier') {
      this.cardControle.cmd.isBuy = false;
      this.cardControle.cmd.ispending = true;
      // this.dataService.user.cmd.push(this.cardControle.cmd)
    }
    this.dataService.user.cmd[this.cardControle.idxCmdToModify] = this.cardControle.cmd;
    this.hideBottomCard();
  }
}
