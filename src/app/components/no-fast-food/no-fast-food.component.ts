import { Component, Input, OnInit } from '@angular/core';
import { showCard, showCardTranslateY, toggleElementVisibility } from 'src/app/utils/showCard';

@Component({
  selector: 'app-no-fast-food',
  templateUrl: './no-fast-food.component.html',
  styleUrls: ['./no-fast-food.component.scss'],
})
export class NoFastFoodComponent implements OnInit {
  @Input() imageSrc: string = '../../../assets/images/fastFood.png';
  @Input() titre: string = 'Titre par défaut';
  @Input() description: string = 'Description par défaut';
  @Input() boutonLabel: string = 'Continuer';
  @Input() scale: string = '1';
  @Input() imageWidth: string = '250px';

  constructor() {}

  ngOnInit() {}

  public showCard() {
    toggleElementVisibility('manage', false);
    showCard('newFastFood', 'x', '0%');
  }
}
