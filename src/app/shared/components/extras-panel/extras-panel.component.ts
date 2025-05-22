import { Component, Input } from '@angular/core';
import { showCard } from 'src/utils/showCard';

@Component({
  selector: 'app-extras-panel',
  templateUrl: './extras-panel.component.html',
  styleUrls: ['./extras-panel.component.scss'],
})
export class ExtrasPanelComponent {
  @Input() orderId: string = '';
  @Input() extras: any[] = [];

  closePanel() {
    showCard(this.orderId, 'y', '100%');
  }
}
