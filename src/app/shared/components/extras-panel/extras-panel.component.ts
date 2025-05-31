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
    showCard(this.orderId, 'y', '200%');
  }

  /**
   * Trie les extras par la longueur de leur nom, du plus court au plus long
   * @returns Les extras triés
   */
  getSortedExtras(): any[] {
    if (!this.extras || this.extras.length === 0) {
      return [];
    }

    return [...this.extras].sort((a, b) => {
      return a.name.length - b.name.length;
    });
  }
}
