import { Component, Input, OnInit } from '@angular/core';
import { CardService } from 'src/services/card.service';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-order-modal-item2',
  templateUrl: './order-modal-item2.component.html',
  styleUrls: ['./order-modal-item2.component.scss'],
})
export class OrderModalItem2Component implements OnInit {
  @Input() postOrder!: (status: any) => void;
  @Input() textLigne1 = 'haricot';
  @Input() textLigne2: string | number = '100f';
  @Input() iconIshow = true;
  @Input() labelIshow = false;
  @Input() sizeLabel = '12px';
  @Input() paddingright = '';
  @Input() backgroundChip = '';
  @Input() shadow = '';
  @Input() black = '';

  constructor(private cardControle: CardService, private dataService: DataService) {}
  ngOnInit() {}

  public hideBottomCard() {
    this.cardControle.hideBottomCard1('bottom-card-home');

    // this.cardIsShow=this.cardControle.bottomCardIsShow
    console.log('click to hode');
  }

  actionToCmd(action: string) {
    if (action == 'buy') {
      this.postOrder('pending');
    }
    if (action == 'pannier') {
      console.log('panier');
    }
  }
}
